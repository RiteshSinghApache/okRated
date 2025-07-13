const express = require('express');
const router = express.Router();
const { submitFeedback, getAllFeedbacks } = require('../controllers/feedbackController');
const jwtMiddleware = require('../middleware/jwtMiddleware');
const validateFeedback = require('../middleware/validateFeedback');

router.post('/create-feedback', jwtMiddleware, validateFeedback, submitFeedback);
router.get('/feedbacks', jwtMiddleware, getAllFeedbacks);

module.exports = router;
