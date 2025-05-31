const socketIo = require('socket.io');
const userModel = require('./models/user.model');
const captainModel = require('./models/captain.model');
const rideModel = require('./models/ride.model');

let io;

function initializeSocket(server) {
    io = socketIo(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        },
        pingTimeout: 60000,
        pingInterval: 25000
    });

    io.on('connection', (socket) => {
        console.log(`Client connected: ${socket.id}`);

        // Handle user/captain joining
        socket.on('join', async (data) => {
            try {
                const { userId, userType } = data;
                console.log(`User ${userId} joined as ${userType}`);

                if (userType === 'user') {
                    await userModel.findByIdAndUpdate(userId, { 
                        socketId: socket.id,
                        online: true 
                    });
                } else if (userType === 'captain') {
                    await captainModel.findByIdAndUpdate(userId, { 
                        socketId: socket.id,
                        online: true,
                        available: true 
                    });
                }
                socket.emit('joined', { success: true });
            } catch (err) {
                console.error('Join error:', err);
                socket.emit('join-error', { message: 'Failed to join' });
            }
        });

        // Handle captain location updates
        socket.on('update-location-captain', async (data) => {
            try {
                const { userId, location } = data;
                
                if (!location || !location.ltd || !location.lng) {
                    return socket.emit('error', { message: 'Invalid location data' });
                }

                await captainModel.findByIdAndUpdate(userId, {
                    location: {
                        ltd: location.ltd,
                        lng: location.lng
                    },
                    lastActive: new Date()
                });
            } catch (err) {
                console.error('Location update error:', err);
            }
        });

        // Handle ride cancellations
     // Handle ride cancellations
socket.on('cancel-ride', async (data) => {
    try {
        const { rideId, cancelledBy } = data;
        console.log(`Ride ${rideId} cancelled by ${cancelledBy}`);

        const ride = await rideModel.findById(rideId)
            .populate('user')
            .populate('captain');

        if (!ride) {
            return socket.emit('error', { message: 'Ride not found' });
        }

        // Update ride status
        ride.status = 'cancelled';
        ride.cancelledBy = cancelledBy;
        await ride.save();

        // ✅ Notify all parties with forceNavigate for both
        const cancellationData = { 
            rideId: ride._id,
            cancelledBy,
            forceNavigate: true, // <<-- Key part
            timestamp: new Date()
        };

        if (ride.user?.socketId) {
            io.to(ride.user.socketId).emit('ride-cancelled', cancellationData);
        }

        // Notify captain (if exists and connected)
        if (ride.captain?.socketId) {
            io.to(ride.captain.socketId).emit('ride-cancelled', cancellationData);
        }

    } catch (err) {
        console.error('Cancel ride error:', err);
        socket.emit('error', { message: 'Failed to cancel ride' });
    }
});


        // Handle payment success
        socket.on('payment-success', async ({ rideId, captainId }) => {
            try {
                const captain = await captainModel.findById(captainId);
                if (captain?.socketId) {
                    sendMessageToSocketId(captain.socketId, {
                        event: 'payment-success',
                        data: { rideId }
                    });
                }
            } catch (err) {
                console.error('Payment success error:', err);
            }
        });

        // Handle disconnection
        socket.on('disconnect', async () => {
            console.log(`Client disconnected: ${socket.id}`);
            try {
                // Mark user/captain as offline
                await userModel.findOneAndUpdate(
                    { socketId: socket.id },
                    { $set: { online: false, socketId: null } }
                );
                await captainModel.findOneAndUpdate(
                    { socketId: socket.id },
                    { $set: { online: false, available: false, socketId: null } }
                );
            } catch (err) {
                console.error('Disconnect cleanup error:', err);
            }
        });
    });

    // Heartbeat monitoring
    setInterval(() => {
        io.emit('heartbeat', { timestamp: Date.now() });
    }, 30000);
}

function sendMessageToSocketId(socketId, messageObject) {
    if (!io) {
        console.error('Socket.io not initialized');
        return false;
    }

    try {
        io.to(socketId).emit(messageObject.event, messageObject.data);
        return true;
    } catch (err) {
        console.error('Failed to send message:', err);
        return false;
    }
}

module.exports = {
    initializeSocket,
    sendMessageToSocketId,
    getIo: () => io
};