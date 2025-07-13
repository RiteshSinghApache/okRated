const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const jwtMiddleware = require('../middleware/jwtMiddleware');

router.get('/profile', jwtMiddleware, userController.getProfile);
router.patch('/update-profile', jwtMiddleware, userController.updateProfile);

module.exports = router;
