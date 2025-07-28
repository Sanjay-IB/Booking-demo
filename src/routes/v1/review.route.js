const express = require('express');
const auth = require('../../middlewares/auth');
const reviewController = require('../../controllers/review.controller');

const router = express.Router();

// Add a new review route
router.post('/addReview/:bookingId', auth('addReview'), reviewController.createReview);

// Get Reviews by artist and services
router.get('/artist/:artistId', auth('viewReviews'), reviewController.getReviewsByArtist);
router.get('/service/:serviceId', auth('viewReviews'), reviewController.getReviewByservice);

module.exports = router;
