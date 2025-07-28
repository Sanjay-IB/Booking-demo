const catchAsync = require('../utils/catchAsync');
const reviewService = require('../services/review.service');
const Booking = require('../models/booking.model');
const Review = require('../models/review.model');

// Create a review for a Service
const createReview = catchAsync(async (req, res) => {
  const { rating, comment } = req.body;
  const { bookingId } = req.params;

  const booking = await Booking.findById(bookingId).populate('artist service client');

  if (!booking) return res.status(404).json({ message: 'Booking not found' });
  if (booking.client._id.toString() !== req.user.id) return res.status(403).json({ message: 'Not your booking' });
  if (booking.status !== 'completed') return res.status(400).json({ message: 'Booking not completed yet' });

  const alreadyReviewed = await Review.findOne({ booking: bookingId });
  if (alreadyReviewed) return res.status(400).json({ message: 'Review already submitted' });

  const review = await reviewService.addReview(booking._id, {
    client: req.user.id,
    artist: booking.artist._id,
    service: booking.service._id,
    rating,
    comment,
  });

  res.status(201).json({ message: 'Review Submitted', data: review });
});

// Get Recviews By Artist
const getReviewsByArtist = catchAsync(async (req, res) => {
  const { artistId } = req.params;
  const reviews = await reviewService.getReviewsByArtist(artistId);
  if (!reviews) return res.status(404).json({ message: 'Reviews not found for this Artist' });
  res.status(200).json(reviews);
});

// Get Reviews By Service
const getReviewByservice = catchAsync(async (req, res) => {
  const { serviceId } = req.params;
  const reviews = await reviewService.getReviewsByService(serviceId);
  if (!reviews) return res.status(404).json({ message: 'Reviews not found for this Service' });
  res.status(200).json(reviews);
});

module.exports = {
  createReview,
  getReviewsByArtist,
  getReviewByservice,
};
