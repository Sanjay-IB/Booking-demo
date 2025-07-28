const catchAsync = require('../utils/catchAsync');
const httpStatus = require('http-status');
const clientService = require('../services/clientProfile.service');
const { uploadToCloudinary } = require('../utils/cloudinary.helper');
const fs = require('fs');

//create Clientprofile
const createClientProfile = catchAsync(async (req, res) => {
  
  const client = req.user.id;
  
  const aadharCard = req.files?.aadharCard?.[0];
  const panCard = req.files?.panCard?.[0];

  let uploadedAadharCard = null;
  let uploadedPanCard = null;

  if (aadharCard) {
    uploadedAadharCard = await uploadToCloudinary(aadharCard.path, 'clients/aadharCard');
  }

  if (panCard) {
    uploadedPanCard = await uploadToCloudinary(panCard.path, 'clients/panCard');
  }

  const data = {
    ...req.body,
    aadharCard: uploadedAadharCard
      ? {
          url: uploadedAadharCard.secure_url,
          public_id: uploadedAadharCard.public_id,
        }
      : undefined,

    panCard: uploadedPanCard
      ? {
          url: uploadedPanCard.secure_url,
          public_id: uploadedPanCard.public_id,
        }
      : undefined,
  };

  const profile = await clientService.createClientProfile(req.user.id, {client:client, ...data});
  res.status(201).json(profile);
});

//update clientProfile
const updateClientProfile = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const existingProfile = await clientService.updateClientProfile(userId);
  let updatedData = { ...req.body };
  console.log(existingProfile);
  console.log(updatedData);

  if (req.files?.aadharCard?.[0]) {
    if (existingProfile?.aadharCard?.public_id) {
      await CloudinaryStorage.uploader.destroy(existingProfile.aadharCard.public_id);
    }

    const uploaded = await uploadToCloudinary(req.files.aadharCard[0].path, 'client/aadharCard');
    updatedData.aadharCard = {
      url: uploaded.secure_url,
      public_id: uploaded.public_id,
    };
  }

  if (req.files?.panCard?.[0]) {
    if (existingProfile?.panCard?.public_id) {
      await CloudinaryStorage.uploader.destroy(existingProfile.panCard.public_id);
    }

    const uploaded = await uploadToCloudinary(req.files.panCard[0].path, 'client/panCard');
    updatedData.panCard = {
      url: uploaded.secure_url,
      public_id: uploaded.public_id,
    };
  }

  const updatedProfile = await clientService.updateClientProfile(req.user.id, { client:userId ,...updatedData});
  res.status(200).json(updatedProfile);
});

module.exports = {
  createClientProfile,
  updateClientProfile,
};
