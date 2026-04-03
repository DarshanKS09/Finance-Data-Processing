const express = require("express");
const financialRecordController = require("../controllers/financialRecordController");
const { protect } = require("../middleware/auth");
const authorize = require("../middleware/authorize");
const validate = require("../middleware/validate");
const validateObjectId = require("../middleware/validateObjectId");
const asyncHandler = require("../utils/asyncHandler");
const { USER_ROLES } = require("../utils/constants");
const {
  validateRecordFilters,
  validateRecordPayload,
} = require("../utils/validators");

const router = express.Router();

router.use(protect);

router
  .route("/")
  .post(
    authorize(USER_ROLES.ADMIN),
    validate((body) => validateRecordPayload(body)),
    asyncHandler(financialRecordController.createRecord)
  )
  .get(
    authorize(USER_ROLES.ADMIN, USER_ROLES.ANALYST, USER_ROLES.VIEWER),
    validate(validateRecordFilters, "query"),
    asyncHandler(financialRecordController.getRecords)
  );

router
  .route("/:id")
  .get(
    authorize(USER_ROLES.ADMIN, USER_ROLES.ANALYST, USER_ROLES.VIEWER),
    validateObjectId(),
    asyncHandler(financialRecordController.getRecordById)
  )
  .patch(
    authorize(USER_ROLES.ADMIN),
    validateObjectId(),
    validate((body) => validateRecordPayload(body, { partial: true })),
    asyncHandler(financialRecordController.updateRecord)
  )
  .delete(
    authorize(USER_ROLES.ADMIN),
    validateObjectId(),
    asyncHandler(financialRecordController.deleteRecord)
  );

module.exports = router;
