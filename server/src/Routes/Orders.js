const express = require("express");

const router = express.Router();

const Orders = require("../Controllers/OrdersController");

router.post("/", Orders.setAddress);
router.put("/", Orders.updateOrders);
router.use("/", Orders.getOders);

module.exports = router;
