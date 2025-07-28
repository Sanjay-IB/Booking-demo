const Services = require('../models/service.model');

// create services by aritist
const createService = async (userId, data) => {
  return Services.create({ artist: userId, ...data });
};

// get all services
const getAllService = async () => {
  return Services.find({ isActive: true });
};

// get Service by user
const getServiceByuser = async (userId) => {
  const services = await Services.findOne({ artist: userId });
  if (!services) {
    const error = new Error('No service provide by Artist ');
    error.statusCode = 400;
    throw error;
  }
  return services;
};

// update Service by user
const updateService = async (serviceId, data, artistId) => {
  const service = await Services.findOne(serviceId);
  if (!service) {
    const error = new Error('Service not found');
    error.statusCode = 404;
    throw error;
  }

  if (service.artist.toString() !== artistId) {
    const error = new Error('you are not authorized to access this service!');
    error.statusCode = 403;
    throw error;
  }

  return Services.findOneAndUpdate(serviceId, data, { new: true });
};

// delete Service by user
const deleteService = async (serviceId, artistId) => {
  const service = await Services.findById(serviceId);

  if (!service) {
    const error = new Error('Service not found!');
    error.statusCode = 404;
    throw error;
  }

  if (service.artist.toString() !== artistId) {
    const error = new Error('you are not authorized to delete this service!');
    error.statusCode = 403;
    throw error;
  }

  await service.deleteOne();
};

module.exports = {
  createService,
  getAllService,
  getServiceByuser,
  updateService,
  deleteService,
};
