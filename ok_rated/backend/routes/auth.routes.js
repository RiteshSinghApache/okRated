const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const verifyToken = require('../middleware/auth.middleware');
const checkRole = require('../middleware/role.middleware');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/send-otp', authController.sendOTP);
router.post('/verify-otp', authController.verifyOTP);

router.post('/token', authController.refreshToken);
router.post('/logout', authController.logout);
router.get('/profile', verifyToken, (req, res) => {
  res.json({ message: `Hello, ${req.user.username}` });
});
router.get('/admin-only', verifyToken, checkRole('admin'), (req, res) => {
  res.json({ message: 'Welcome Admin!' });
});

module.exports = router;