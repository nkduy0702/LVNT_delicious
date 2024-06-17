const express = require("express");

const router = express.Router();

const SaleController = require("../../Controllers/Admin/SaleController");

router.use("/byMonth", SaleController.saleByMonth);
router.use("/", SaleController.sale);

module.exports = router;
