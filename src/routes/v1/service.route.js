const express = require('express');
const auth = require('../../middlewares/auth');
const upload = require('../../middlewares/multer');
const serviceController = require('../../controllers/service.controller');

const router = express.Router();

// Create a new service for an artist
router.post('/add-service', auth('manageService'), upload.single('image'), serviceController.createService);

// Get Services from app
router.get('/allServices', auth('viewServices'), serviceController.getAllService);
router.get('/service/:userId', auth('viewServices'), serviceController.getServiceByArtist);

// Update Service Details by artist
router.patch('/updateService/:serviceId', auth('manageService'), serviceController.updateService);

// Delete Service by artist
router.delete('/deleteService/:serviceId', auth('manageService'), serviceController.deleteService);

module.exports = router;
