/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');

const artistProfileSchema = new mongoose.Schema(
  {
    artist: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    profileImage: {
      url: { type: String },
      public_id: { type: String },
    },
    certificate: {
      url: { type: String },
      public_id: { type: String },
    },
    courseDetails: String,
    address: String,
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  },
  { timestamps: true }
);

const Artist = mongoose.model('ArtistProfile', artistProfileSchema);
module.exports = Artist;
