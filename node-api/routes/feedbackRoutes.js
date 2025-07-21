const express = require('express');
const router = express.Router();
const { submitFeedback, getAllFeedbacks } = require('../controllers/feedbackController');
const jwtMiddleware = require('../middleware/jwtMiddleware');
const validateFeedback = require('../middleware/validateFeedback');

router.post('/create-feedback', submitFeedback);
router.get('/feedbacks', getAllFeedbacks);

module.exports = router;
