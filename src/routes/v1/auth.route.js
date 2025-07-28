const express = require('express');
const validate = require('../../middlewares/validate');
const authValidation = require('../../validations/auth.validation');
// const userValidation = require('../../validations/user.validation')
const authController = require('../../controllers/auth.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post('/register', validate(authValidation.createUser), authController.register);
router.post('/login', validate(authValidation.login), authController.login);
router.post('/logout', validate(authValidation.logout), authController.logout);
router.post('/refreshTokens', validate(authValidation.refreshTokens), authController.refreshTokens);

// Reset password routes
router.post('/forgotPassword', validate(authValidation.forgotPassword), authController.forgotPassword);
router.post('/resetPassword', validate(authValidation.resetPassword), authController.resetPassword);

// Email verification routes
router.post('/sendVerificationEmail', auth(), authController.sendVerificationEmail);
router.post('/verifyEmail', validate(authValidation.verifyEmail), authController.verifyEmail);

module.exports = router;
