const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const artistService = require('../services/artistProfile.service');
const { uploadToCloudinary } = require('../utils/cloudinary.helper');
const fs = require('fs');

// Create artist profile
const createArtistProfile = catchAsync(async (req, res) => {
  const profileImage = req.files?.profileImage?.[0];
  const certificate = req.files?.certificate?.[0];

  let uploadedProfileImage = null;
  let uploadedCertificate = null;

  if (profileImage) {
    uploadedProfileImage = await uploadToCloudinary(profileImage.path, 'artist/profile');
  }

  if (certificate) {
    uploadedCertificate = await uploadToCloudinary(certificate.path, 'artist/certificates');
  }

  const data = {
    ...req.body,
    profileImage: uploadedProfileImage
      ? {
          url: uploadedProfileImage.secure_url,
          public_id: uploadedProfileImage.public_id,
        }
      : undefined,

    certificate: uploadedCertificate
      ? {
          url: uploadedCertificate.secure_url,
          public_id: uploadedCertificate.public_id,
        }
      : undefined,
  };

  const profile = await artistService.createArtistProfile(req.user.id, data);
  res.status(201).json(profile);
});

// Update artist profile
const updateArtistProfile = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const existingProfile = await artistService.updateArtistProfile(userId);
  let updatedData = { ...req.body };

  if (req.files?.profileImage?.[0]) {
    if (existingProfile?.profileImage?.public_id) {
      await cloudinary.uploader.destroy(existingProfile.profileImage.public_id);
    }

    const uploaded = await uploadToCloudinary(req.files.profileImage[0].path, 'artist/profile');
    updatedData.profileImage = {
      url: uploaded.secure_url,
      public_id: uploaded.public_id,
    };
  }

  // Upload new certificate if provided
  if (req.files?.certificate?.[0]) {
    if (existingProfile?.certificate?.public_id) {
      await cloudinary.uploader.destroy(existingProfile.certificate.public_id);
    }

    const uploaded = await uploadToCloudinary(req.files.certificate[0].path, 'artist/certificates');
    updatedData.certificate = {
      url: uploaded.secure_url,
      public_id: uploaded.public_id,
    };
  }

  const updatedProfile = await artistService.updateArtistProfile(userId, updatedData);
  res.status(httpStatus.OK).json(updatedProfile);
});

module.exports = {
  createArtistProfile,
  updateArtistProfile,
};
