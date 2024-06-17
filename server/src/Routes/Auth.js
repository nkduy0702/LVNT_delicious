const express = require("express");

const router = express.Router();

const HomeController = require("../Controllers/AuthController");

router.post("/signin", HomeController.signin);
router.post("/signup", HomeController.signup);

module.exports = router;
