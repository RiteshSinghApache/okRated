const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const jwtMiddleware = require('../middleware/jwtMiddleware');
const { generateQRCode } = require('../controllers/qrController');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Set up Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = 'uploads/business_logos/';
        fs.mkdirSync(dir, { recursive: true });
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const filename = `logo_${Date.now()}${ext}`;
        cb(null, filename);
    }
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("image/")) cb(null, true);
        else cb(new Error("Only image files are allowed"), false);
    }
});

router.get('/profile', jwtMiddleware, userController.getProfile);
router.patch('/update-profile', jwtMiddleware, userController.updateProfile);
router.patch(
  '/update-profile-business',
  jwtMiddleware,
  upload.single("logo"), // logo field must match frontend
  userController.uploadBusinessLogo
);
router.get('/profile/unique/:uniqueKey', userController.getProfileByUniqueId);
router.patch('/generate-qr', jwtMiddleware, generateQRCode);

// Upload business logo and update business info
router.post('/upload-logo', jwtMiddleware, upload.single('logo'), userController.uploadBusinessLogo);

module.exports = router;
