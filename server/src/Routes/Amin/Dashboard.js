const express = require("express");

const router = express.Router();

const DashboardController = require("../../Controllers/Admin/DashboardController");

router.post("/users/delete", DashboardController.delete);
router.use("/users", DashboardController.users);

module.exports = router;
