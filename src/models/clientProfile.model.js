/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');

const clientProfileSchema = new mongoose.Schema(
  {
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    aadharCard: {
      url: { type: String },
      public_id: { type: String },
    },
    panCard: {
      url: { type: String },
      public_id: { type: String },
    },
    address: String,
  },
  { timestamps: true }
);

const Client = mongoose.model('ClientProfile', clientProfileSchema);
module.exports = Client;
