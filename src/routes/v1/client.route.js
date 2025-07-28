const express = require('express');
const clientController = require('../../controllers/client.controller');
const upload = require('../../middlewares/multer');
const auth = require('../../middlewares/auth');

const router = express.Router();

// Add Client Profile
router.post(
  '/addProfile',
  auth('updateOwnUserProfile'),
  upload.fields([
    { name: 'aadharCard', maxCount: 1 },
    { name: 'panCard', maxCount: 1 },
  ]),
  clientController.createClientProfile
);

// update client Profile
router.patch(
  '/updateProfile',
  auth('updateOwnUserProfile'),
  upload.fields([
    { name: 'aadharCard', maxCount: 1 },
    { name: 'panCard', maxCount: 1 },
  ]),
  clientController.updateClientProfile
);

module.exports = router;
