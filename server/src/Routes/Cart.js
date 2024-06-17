const express = require("express");

const router = express.Router();

const CartController = require("../Controllers/CartController");

router.post("/add", CartController.addToCart);
router.put("/modifier", CartController.modifierQuantity);
router.delete("/", CartController.deleteItems);
router.use("/:slug", CartController.getCart);

module.exports = router;
