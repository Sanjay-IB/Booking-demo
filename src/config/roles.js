const allRoles = {
  user: [
    'createBooking',
    'updateBooking',
    'cancelBooking',
    'viewServices',
    'addReview',
    'updateOwnUserProfile',
    'viewOwnBookings',
  ],
  artist: ['manageService', 'manageBookings', 'viewReviews', 'viewServices', 'updateOwnArtistProfile', 'viewOwnBookings'],
  admin: [
    'getUsers',
    'manageUsers',
    'manageServices',
    'manageAllBookings',
    'viewAnalytics',
    'viewAllProfiles',
    'deleteReview',
  ],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
