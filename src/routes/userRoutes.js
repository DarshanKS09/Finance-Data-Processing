const express = require("express");
const userController = require("../controllers/userController");
const { protect } = require("../middleware/auth");
const authorize = require("../middleware/authorize");
const validate = require("../middleware/validate");
const validateObjectId = require("../middleware/validateObjectId");
const asyncHandler = require("../utils/asyncHandler");
const { USER_ROLES } = require("../utils/constants");
const { validateUserPayload } = require("../utils/validators");

const router = express.Router();

router.use(protect, authorize(USER_ROLES.ADMIN));

router
  .route("/")
  .post(validate((body) => validateUserPayload(body)), asyncHandler(userController.createUser))
  .get(asyncHandler(userController.getUsers));

router
  .route("/:id")
  .get(validateObjectId(), asyncHandler(userController.getUserById))
  .patch(
    validateObjectId(),
    validate((body) => validateUserPayload(body, { partial: true })),
    asyncHandler(userController.updateUser)
  )
  .delete(validateObjectId(), asyncHandler(userController.deleteUser));

module.exports = router;
