const reviewModel = require('../models/review.model');

async function createReview({ userId, rideId, captainId, rating, comment }) {
    if (!rideId || !captainId || !rating || !comment) {
        throw new Error('All fields are required');
    }

    try {
        const review = await reviewModel.create({
            userId,
            rideId,
             captainId,
            rating,
            comment
        });

        return review;
    } catch (err) {
        throw new Error('Error while creating review: ' + err.message);
    }
}

async function getReviewsForCaptain(captainId) {
    if (!captainId) {
        throw new Error('Captain ID is required');
    }

    try {
        const reviews = await reviewModel.find({ captain: captainId }).populate('user');
        return reviews;
    } catch (err) {
        throw new Error('Error while fetching reviews: ' + err.message);
    }
}

module.exports = {
    createReview,
    getReviewsForCaptain
};
