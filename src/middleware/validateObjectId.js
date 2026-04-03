const AppError = require("../utils/appError");
const { isValidObjectId } = require("../utils/validators");

const validateObjectId = (paramName = "id") => (req, res, next) => {
  const value = req.params[paramName];

  if (!isValidObjectId(value)) {
    return next(new AppError(`Invalid identifier provided for ${paramName}.`, 400));
  }

  return next();
};

module.exports = validateObjectId;
