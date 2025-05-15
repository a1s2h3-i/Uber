const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const reviewController = require('../controllers/review.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post(
    '/create',
    authMiddleware.authUser,
    body('rideId').isMongoId(),
    body('rating').isInt({ min: 1, max: 5 }),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Validation failed', errors: errors.array() });
      }
      next(); // Continue to controller only if valid
    },
    reviewController.createReview
  );

router.get('/captain/:captainId', reviewController.getReviewsForCaptain);

module.exports = router;
