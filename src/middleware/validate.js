const asyncHandler = require("../utils/asyncHandler");

const validate = (validator, source = "body") =>
  asyncHandler(async (req, res, next) => {
    validator(req[source]);
    next();
  });

module.exports = validate;
