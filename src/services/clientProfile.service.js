const clientProfile = require('../models/clientProfile.model');

// create client profile
const createClientProfile = async (userId, data) => {
  const existingProfile = await clientProfile.findOne({ client: userId });
  if (existingProfile) {
    const error = new Error('Profile already exists! goto update profile');
    error.statusCode = 400;
    throw error;
  }
  return clientProfile.create({ user: userId, ...data });
};

// update client profile
const updateClientProfile = async (userId, data) => {
  const existingProfile = await clientProfile.findOne({ client: userId });
  if (!existingProfile) {
    const error = new Error('Profile not found! goto add profile ');
    error.statusCode = 400;
    throw error;
  }
  return clientProfile.findOneAndUpdate(userId, data, { new: true });
};

module.exports = {
  createClientProfile,
  updateClientProfile,
};
