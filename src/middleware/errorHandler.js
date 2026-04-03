const AppError = require("../utils/appError");

const handleDuplicateKeyError = (error) => {
  const duplicateField = Object.keys(error.keyValue || {})[0] || "field";
  return new AppError(`${duplicateField} already exists.`, 409);
};

const handleValidationError = (error) => {
  const message = Object.values(error.errors)
    .map((detail) => detail.message)
    .join(", ");

  return new AppError(message || "Validation failed.", 400);
};

const errorHandler = (error, req, res, next) => {
  let normalizedError = error;

  if (error.code === 11000) {
    normalizedError = handleDuplicateKeyError(error);
  } else if (error.name === "ValidationError") {
    normalizedError = handleValidationError(error);
  } else if (error.name === "CastError") {
    normalizedError = new AppError("Invalid resource identifier.", 400);
  } else if (error.name === "JsonWebTokenError") {
    normalizedError = new AppError("Invalid authentication token.", 401);
  } else if (error.name === "TokenExpiredError") {
    normalizedError = new AppError("Authentication token has expired.", 401);
  } else if (!(error instanceof AppError)) {
    normalizedError = new AppError("Internal server error.", 500);
  }

  const statusCode = normalizedError.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: normalizedError.message,
    ...(process.env.NODE_ENV !== "production" && { stack: error.stack }),
  });
};

module.exports = errorHandler;
