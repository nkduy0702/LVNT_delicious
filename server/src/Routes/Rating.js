const express = require("express");

const router = express.Router();

const RatingController = require("../Controllers/RatingController");

router.post("/", RatingController.rate);
router.use("/", RatingController.getRate);

module.exports = router;
