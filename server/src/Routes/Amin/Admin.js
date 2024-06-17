const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();

const AdminController = require("../../Controllers/Admin/AdminController");

router.post("/ingredients", AdminController.add);
router.delete("/ingredients/:slug", AdminController.delete);
router.use("/ingredients", AdminController.get);

module.exports = router;
