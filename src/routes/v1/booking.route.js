const express = require('express');
const bookingController = require('../../controllers/booking.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

// Add New Booking route
router.post('/book/:serviceId', auth('createBooking'), bookingController.createBooking);

// Get Bookings by Artist and Client IDs
router.get('/:bookingId', auth('manageBookings'), bookingController.getBookingById);
router.get('/artist/:artistId', auth('manageBookings'), bookingController.getBookingsByArtist);
router.get('/client/:clientId', auth('viewOwnBookings'), bookingController.getBookingsbyClient);

// Update Booking Details by client with Booking Id
router.put('/:bookingId/update', auth('updateBooking'), bookingController.updateBookingByClient);

// Update Booking status and Payment Status by Booing ID
router.patch('/:bookingId/status', auth('manageBookings'), bookingController.updateBookingStatus);
router.patch('/:bookingId/payment', auth('manageBookings'), bookingController.updatePaymentStatus);
router.patch('/:bookingId/cancel', auth('cancelBooking'), bookingController.cancelBookingByClient);

module.exports = router;
