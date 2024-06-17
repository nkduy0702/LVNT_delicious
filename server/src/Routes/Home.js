const express = require("express");

const router = express.Router();

const HomeController = require("../Controllers/HomeController");

router.use("/ingredients/:slug", HomeController.getIngredients);
router.use("/", HomeController.index);

module.exports = router;
