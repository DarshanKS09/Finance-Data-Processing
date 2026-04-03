const express = require("express");
const dashboardController = require("../controllers/dashboardController");
const { protect } = require("../middleware/auth");
const authorize = require("../middleware/authorize");
const validate = require("../middleware/validate");
const asyncHandler = require("../utils/asyncHandler");
const { USER_ROLES } = require("../utils/constants");
const { validateRecordFilters } = require("../utils/validators");

const router = express.Router();

router.get(
  "/insights",
  protect,
  authorize(USER_ROLES.ADMIN, USER_ROLES.ANALYST),
  validate(validateRecordFilters, "query"),
  asyncHandler(dashboardController.getInsights)
);

module.exports = router;
