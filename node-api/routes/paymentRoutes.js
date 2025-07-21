const express = require("express");
const router = express.Router();
const jwtMiddleware = require('../middleware/jwtMiddleware');
const paymentController = require("../controllers/paymentController");

router.post("/initiate", jwtMiddleware, paymentController.initiatePayment);

module.exports = router;
