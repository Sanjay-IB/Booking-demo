const Review = require('../models/review.model');

// Add review for a service
const addReview = async (bookingId, data) => {
  return Review.create({ booking: bookingId, ...data });
};

// Get reviews by artist
const getReviewsByArtist = async (artistId) => {
  return Review.find({ artist: artistId });
};

// Get Reviews by Service
const getReviewsByService = async (serviceId) => {
  return Review.find({ service: serviceId });
};

module.exports = {
  addReview,
  getReviewsByArtist,
  getReviewsByService,
};
