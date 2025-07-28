const express = require('express');
const artistController = require('../../controllers/artist.controller');
const auth = require('../../middlewares/auth');
const upload = require('../../middlewares/multer');

const router = express.Router();

// Route to create artist profile
router.post(
  '/addProfile',
  auth('updateOwnArtistProfile'),
  upload.fields([
    { name: 'profileImage', maxCount: 1 },
    { name: 'certificate', maxCount: 1 },
  ]),
  artistController.createArtistProfile
);

// Route to update artist profile
router.patch(
  '/updateProfile',
  auth('updateOwnArtistProfile'),
  upload.fields([
    { name: 'profileImage', maxCount: 1 },
    { name: 'certificate', maxCount: 1 },
  ]),
  artistController.updateArtistProfile
);

module.exports = router;
