const express = require("express");
const authController = require("../controllers/authController");
const { protect } = require("../middleware/auth");
const validate = require("../middleware/validate");
const asyncHandler = require("../utils/asyncHandler");
const { validateLoginPayload } = require("../utils/validators");

const router = express.Router();

router.post("/login", validate(validateLoginPayload), asyncHandler(authController.login));
router.get("/me", protect, asyncHandler(authController.getProfile));

module.exports = router;
