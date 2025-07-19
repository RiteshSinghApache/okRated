const express = require('express');
const router = express.Router();
const { generateQRCode } = require('../controllers/qrController');
const jwtMiddleware = require('../middleware/jwtMiddleware');

router.post('/generate', jwtMiddleware, generateQRCode);

module.exports = router;
