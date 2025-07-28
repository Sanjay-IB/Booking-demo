const catchAsync = require('../utils/catchAsync');
const BookingService = require('../services/booking.service');
const Service = require('../models/service.model');

// client books a Service
const createBooking = catchAsync(async (req, res) => {
  const { serviceId } = req.params;
  const { bookingDate, timeSlot, address, travelFee, gst, total } = req.body;

  const service = await Service.findById(serviceId).populate('artist');
  if (!service) return res.status(404).json({ message: 'Service not found' });

  const booking = await BookingService.createBooking({
    client: req.user.id,
    artist: service.user,
    service: service._id,
    bookingDate,
    timeSlot,
    address,
    travelFee,
    gst,
    total,
  });

  res.status(201).json({ message: 'Booking created', BookingData: booking });
});

// GetBookings by Logged in Client
const getBookingsbyClient = catchAsync(async (req, res) => {
  const bookings = await BookingService.getBookingsByClient(req.user.id);
  res.status(200).json(bookings);
});

// GetBookings assigned to the artist
const getBookingsByArtist = catchAsync(async (req, res) => {
  const bookings = await BookingService.getBookingsByArtist(req.user.id);
  res.status(200).json(bookings);
});

// GetBooking By booking id
const getBookingById = catchAsync(async (req, res) => {
  const booking = await BookingService.getBookingById(req.params.id);
  if (!booking) {
    return res.status(404).json({ message: 'Booking not found' });
  }

  res.status(200).json(booking);
});

// Reschedule or Update Booking by Client
const updateBookingByClient = catchAsync(async (req, res) => {
  const updated = await BookingService.updateBookingByClient(req.params.id, req.body);
  if (!updated) {
    return res.status(404).json({ message: 'Booking not found' });
  }

  res.status(200).json(updated);
});

// update Booking by client
const updateBookingStatus = catchAsync(async (req, res) => {
  const updated = await BookingService.updateBookingStatus(req.params.id, req.body.status);
  console.log(updated);
  if (!updated) {
    return res.status(404).json({ message: 'Booking not found' });
  }
  res.status(200).json(updated);
});

// cancel Booking by Client
const cancelBookingByClient = catchAsync(async (req, res) => {
  const updated = await BookingService.cancelBookingByClient(req.params.id);
  console.log(updated);
  if (!updated) {
    return res.status(404).json({ message: 'Booking not found' });
  }

  res.status(200).json({ message: 'Booking cancelled successfully' });
});

// upadate PayementStatus
const updatePaymentStatus = catchAsync(async (req, res) => {
  const updated = await BookingService.updatePaymentStatus(req.params.id, req.body.paymentStatus);
  if (!updated) {
    return res.status(404).json({ message: 'Booking not found' });
  }
  res.status(200).json({ message: 'Payment status updated successfully' });
});

module.exports = {
  createBooking,
  getBookingById,
  getBookingsbyClient,
  getBookingsByArtist,
  updateBookingByClient,
  cancelBookingByClient,
  updateBookingStatus,
  updatePaymentStatus,
};
