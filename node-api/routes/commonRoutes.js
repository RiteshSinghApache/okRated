const express = require("express");
const router = express.Router();
const commonController = require("../controllers/commonController");

router.get("/business-types", commonController.getBusinessTypes);

module.exports = router;
