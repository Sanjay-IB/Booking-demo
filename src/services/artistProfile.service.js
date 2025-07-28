const ArtistProfile = require('../models/artistProfile.model');

// Create artist profile
const createArtistProfile = async (userId, data) => {
  const existingProfile = await ArtistProfile.findOne({ artist: userId });
  if (existingProfile) {
    const error = new Error('Profile already exists! goto update');
    error.statusCode = 400;
    throw error;
  }
  return ArtistProfile.create({ artist: userId, ...data });
};

// Update artist profile
const updateArtistProfile = async (userId, data) => {
  const checkProfile = await ArtistProfile.findOne({ artist: userId });
  if (!checkProfile) {
    const error = new Error('Profile data not found! goto add profile');
    error.statusCode = 400;
    throw error;
  }
  return ArtistProfile.findOneAndUpdate({ artist: userId }, data, { new: true });
};

module.exports = {
  createArtistProfile,
  updateArtistProfile,
};
