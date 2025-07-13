const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// OTP
router.post('/send-otp', authController.sentOtp);
router.post('/verify-otp', authController.verifyOtp);

// Social login
router.post('/google-login', authController.googleLogin);

// Optional (if still using)
router.post('/register', authController.register);
router.post('/login', authController.login);

// Refresh token 
router.post('/refresh-token', authController.refreshToken);

// Logout
router.post('/logout', authController.logout);

module.exports = router;
