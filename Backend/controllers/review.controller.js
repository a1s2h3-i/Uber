const reviewService = require('../services/review.services');
const rideModel = require('../models/ride.model');
const {validationResult}=require('express-validator');

module.exports.createReview = async (req, res) => {
    const { rideId, rating, comment, captainId } = req.body;
    const userId = req.user._id;
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    console.log("Request body:", req.body); // Log incoming review data
    console.log("Authenticated user:", req.user); // Log authenticated user

    if (!rideId || !rating) {
        return res.status(400).json({ message: 'rideId and rating are required' });
    }

    try {
        // Fetch the ride and populate the captain field
        const ride = await rideModel.findById(rideId).populate('captain');
        
        console.log("Ride object:", ride); // Log the ride object to ensure captain is populated

        if (!ride || ride.status !== 'completed') {
            return res.status(400).json({ message: 'Ride not found or not completed' });
        }

        const captainId = ride.captain ? ride.captain._id : null; // Ensure captainId is fetched correctly
        console.log("Captain ID:", captainId); // Log the captainId to ensure it's being fetched

        // Use the reviewService to create the review
        const review = await reviewService.createReview({
            userId,
            rideId,
            captainId,
            rating,
            comment
        });

        console.log("Review created:", review); // Log the created review

        res.status(201).json(review);
    } catch (err) {
        console.error("Error while creating review:", err); // Log the error message
        res.status(500).json({ message: err.message });
    }
};

module.exports.getReviewsForCaptain = async (req, res) => {
    const { captainId } = req.params;

    try {
        // Use the reviewService to get the reviews for the captain
        const reviewData = await reviewService.getReviewsForCaptain(captainId);

        res.status(200).json(reviewData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
