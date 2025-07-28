const catchAsync = require('../utils/catchAsync');
const servicesService = require('../services/services.service');
const { uploadToCloudinary } = require('../utils/cloudinary.helper');

// Create service by artist

const createService = catchAsync(async (req, res) => {
  const artistId = req.user.id;
  const { body } = req;

  let imageUrl = '';
  let cloudinaryId = '';

  if (req.file && req.file.path) {
    const result = await uploadToCloudinary(req.file.path, 'services');
    imageUrl = result.secure_url;
    cloudinaryId = result.public_id;
  }

  const serviceData = {
    ...body,
    image: imageUrl,
    cloudinaryId,
  };

  const service = await servicesService.createService(artistId, serviceData);
  res.status(201).json(service);
});

// Get all active services
const getAllService = catchAsync(async (req, res) => {
  const allServices = await servicesService.getAllService();
  res.status(200).json(allServices);
});

// Get service by artist ID
const getServiceByArtist = catchAsync(async (req, res) => {
  const service = await servicesService.getServiceByuser(req.params.id);
  res.status(200).json(service);
});

// Update service by ID
const updateService = catchAsync(async (req, res) => {
  const serviceId = req.params.id;
  const artistId = req.user.id;
  const updatedService = await servicesService.updateService(serviceId, req.body, artistId);
  res.status(200).json(updatedService);
});

// Delete service by ID
const deleteService = catchAsync(async (req, res) => {
  const { serviceId } = req.params;
  const artistId = req.user.id;
  await servicesService.deleteService(serviceId, artistId);
  res.status(200).json({ message: 'Service deleted successfully' });
});

module.exports = {
  createService,
  getAllService,
  getServiceByArtist,
  updateService,
  deleteService,
};
