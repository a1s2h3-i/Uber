const socketIo=require('socket.io');
const userModel=require('./models/user.model');
const captainModel=require('./models/captain.model');


let io;

function initializeSocket(server){
    io=socketIo(server,{
        cors:{
            origin:'*',
            methods:['GET','POST']
        }
    });
    io.on('connection',(socket)=>{
        console.log(`Client connection :${socket.id}`);

        socket.on('join',async(data)=>{
            const {userId,userType}=data;
            console.log(`User ${userId} joined as  ${userType}`)

            if(userType=='user'){
                await userModel.findByIdAndUpdate(userId,{socketId:socket.id})
                console.log(`User socketId updated: ${socket.id}`);
            }
            else if(userType=='captain'){
                await captainModel.findByIdAndUpdate(userId,{socketId:socket.id});
                console.log(`Captain socketId updated: ${socket.id}`);

            }
            socket.emit('joined');
        })
        socket.on('update-location-captain', async (data) => {
            const { userId, location } = data;

            if (!location || !location.ltd || !location.lng) {
                return socket.emit('error', { message: 'Invalid location data' });
            }

            await captainModel.findByIdAndUpdate(userId, {
                location: {
                    ltd: location.ltd,
                    lng: location.lng
                }
            });
        });
        socket.on('disconnect',()=>{
            console.log(`Client disconnected:${socket.id}`)
        })

        //////////////////////////////////////
        socket.on('payment-success', async ({ rideId, captainId }) => {
            const captain = await captainModel.findById(captainId);
            if (captain && captain.socketId) {
              sendMessageToSocketId(captain.socketId, {
                event: 'payment-success',
                data: { rideId }
              });
            }
          });
          
    })
}
function sendMessageToSocketId(socketId,messageObject){
    console.log(messageObject);
    if(io){
        io.to(socketId).emit(messageObject.event,messageObject.data);
    }
    else{
        console.log('Socket.io not initialized');
    }
}

  

module.exports={initializeSocket,sendMessageToSocketId};