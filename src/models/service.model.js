const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema(
  {
    artist: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: String,
    description: String,
    basePrice: { type: String, required: true },
    image: String,
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Service = mongoose.model('Service', serviceSchema);
module.exports = Service;
