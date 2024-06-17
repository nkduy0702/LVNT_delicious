const express = require("express");

const router = express.Router();

const DiscountController = require("../Controllers/DiscountController");

router.get("/:slug", DiscountController.check);

module.exports = router;
