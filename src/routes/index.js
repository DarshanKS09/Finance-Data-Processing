const express = require("express");
const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const financialRecordRoutes = require("./financialRecordRoutes");
const dashboardRoutes = require("./dashboardRoutes");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/records", financialRecordRoutes);
router.use("/dashboard", dashboardRoutes);

module.exports = router;
