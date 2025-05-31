const rideService=require('../services/ride.service');
const {validationResult}=require('express-validator');
const mapService=require('../services/maps.service');
const {endMessageToSocketId, sendMessageToSocketId}=require('../socket');
const rideModel = require('../models/ride.model');
const userModel=require('../models/user.model');

module.exports.createRide = async (req, res) => {
    const errors = validationResult(req);
    console.log('[Controller] Received body:', req.body);

    if (!errors.isEmpty()) {
        console.log('[Controller] Validation errors:', errors.array());
        return res.status(400).json({ errors: errors.array() });
    }

    const { userId, pickup, destination, vehicleType } = req.body;
    console.log('[Controller] Parsed fields:', { pickup, destination, vehicleType });
    console.log('[Controller] Authenticated user ID:', req.user._id);

    try {
        const ride = await rideService.createRide({
            user: req.user._id,
            pickup,
            destination,
            vehicleType
        });

        console.log('[Controller] Ride created:', ride);
        
        
     res.status(201).json(ride);
         const pickupCoordinates=await mapService.getAddressCoordinate(pickup);
        console.log(pickupCoordinates);

       
        const captainInRadius=await mapService.getCaptainsIntheRadius(pickupCoordinates.ltd,pickupCoordinates.lng,1000);
        ride.otp="";
        console.log("Captainin radius:"+ captainInRadius);

        const rideWithUser=await rideModel.findOne({_id:ride._id}).populate('user');

        captainInRadius.map(captain=>{
            sendMessageToSocketId(captain.socketId,{
                event:'new-ride',
                data:rideWithUser
            })
        })
       

    } catch (err) {
        console.error('[Controller] Error:', err.message);
        return res.status(500).json({ message: err.message });
    }
};

module.exports.getFare=async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(({errors:errors.array()}));

    }
    const {pickup,destination}=req.query;

    try{
        const fare=await rideService.getFare(pickup,destination);
        return res.status(200).json(fare);
    }
    catch(err){
        return res.status(500).json({message:err.message});
    }
}

module.exports.confirmRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {
        const ride = await rideService.confirmRide({ rideId, captain: req.captain });

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-confirmed',
            data: ride
        })

        return res.status(200).json(ride);
    } catch (err) {

        console.log(err);
        return res.status(500).json({ message: err.message });
    }
}


module.exports.startRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId, otp } = req.query;

    try {
        const ride = await rideService.startRide({ rideId, otp, captain: req.captain });

        console.log(ride);

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-started',
            data: ride
        })

        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}
module.exports.endRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {
        const ride = await rideService.endRide({ rideId, captain: req.captain });

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-ended',
            data: ride
        })



        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    } 
}

// In ride.controller.js
module.exports.getCaptainRides = async (req, res) => {
    try {
        const captainId = req.captain._id;
        
        // Get all rides for this captain, sorted by newest first
        const rides = await rideModel.find({ captain: captainId })
            .sort({ createdAt: -1 })
            .populate('user', 'name phone fullname') // include user details
            .lean(); // convert to plain JS object
            
        // Calculate total earnings
        const totalEarnings = rides.reduce((sum, ride) => sum + (ride.fare || 0), 0);
        
        // Calculate completed rides count
        const completedRides = rides.filter(ride => ride.status === 'completed').length;
        
        return res.status(200).json({
            rides,
            stats: {
                totalEarnings,
                totalRides: rides.length,
                completedRides,
                cancelledRides: rides.filter(ride => ride.status === 'cancelled').length
            }
        });
    } catch (err) {
        console.error('[Controller] Error fetching captain rides:', err.message);
        return res.status(500).json({ message: err.message });
    }
};
  

//cancel Rides
module.exports.cancelRide = async (req, res) => {
    const { rideId } = req.body;
    const userId = req.user?._id || req.captain?._id; // Either user or captain

    if (!rideId) {
        return res.status(400).json({ message: 'Ride ID is required' });
    }

    try {
        const ride = await rideModel.findById(rideId).populate('user').populate('captain');

        if (!ride) {
            return res.status(404).json({ message: 'Ride not found' });
        }

        if (ride.status === 'completed' || ride.status === 'cancelled') {
            return res.status(400).json({ message: 'Ride already completed or cancelled' });
        }

        ride.status = 'cancelled';
        await ride.save();

        // Notify both parties
        if (ride.user?.socketId) {
            sendMessageToSocketId(ride.user.socketId, {
                event: 'ride-cancelled',
                data: { rideId: ride._id }
            });
        }

        if (ride.captain?.socketId) {
            sendMessageToSocketId(ride.captain.socketId, {
                event: 'ride-cancelled',
                data: { rideId: ride._id }
            });
        }

        return res.status(200).json({ message: 'Ride cancelled successfully' });

    } catch (err) {
        console.error('[Cancel Ride] Error:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
