const Booking = require('../models/booking.model');

// booking by client with Id
const createBooking = async (data) => {
  return Booking.create(data);
};

// GetBookings By clients
const getBookingsByClient = async (userId) => {
  return Booking.find({ client: userId }).populate('artist', 'name email').populate('service', 'title basePrice');
};

// getBookings assigned by artist
const getBookingsByArtist = async (userId) => {
  return Booking.find({ artist: userId }).populate('client', 'name email').populate('service', 'title basePrice');
};

// getBookins by Booking Id
const getBookingById = async (bookingId) => {
  return Booking.findOne(bookingId).populate('artist', 'name email').populate('service', 'title basePrice');
};

// update Booking by client (Reshceduled)
const updateBookingByClient = async (bookingId, data) => {
  return Booking.findOneAndUpdate(bookingId, data, { new: true });
};

// cancel booking by client
const cancelBookingByClient = async (bookingId) => {
  return Booking.findOneAndUpdate(bookingId, { status: 'cancelled' }, { new: true });
};

// update status (confirmed/completed/cancelled)
const updateBookingStatus = async (bookingId, status) => {
  return Booking.findOneAndUpdate(bookingId, { status }, { new: true }).populate('client artist service');
};

// upaate payment status
const updatePaymentStatus = async (bookingId, paymentStatus) => {
  return Booking.findOneAndUpdate(bookingId, { paymentStatus }, { new: true });
};

module.exports = {
  createBooking,
  getBookingById,
  getBookingsByClient,
  getBookingsByArtist,
  updateBookingByClient,
  cancelBookingByClient,
  updateBookingStatus,
  updatePaymentStatus,
};
