const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./admin.route');
const bookingRoute = require('./booking.route');
const serviceRoute = require('./service.route');
const artistProfileRoute = require('./artist.route');
const clientProfileRoute = require('./client.route');
const reviewRoute = require('./review.route');
const docsRoute = require('./docs.route');

const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  { path: '/auth', route: authRoute },
  { path: '/admin', route: userRoute },
  { path: '/bookings', route: bookingRoute },
  { path: '/services', route: serviceRoute },
  { path: '/artist-profile', route: artistProfileRoute },
  { path: '/client-profile', route: clientProfileRoute },
  { path: '/reviews', route: reviewRoute },
];

const devRoutes = [{ path: '/docs', route: docsRoute }];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
