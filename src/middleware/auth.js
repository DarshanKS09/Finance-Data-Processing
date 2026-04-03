const jwt = require("jsonwebtoken");
const User = require("../models/User");
const AppError = require("../utils/appError");
const asyncHandler = require("../utils/asyncHandler");
const config = require("../config/env");
const { USER_STATUSES } = require("../utils/constants");

const protect = asyncHandler(async (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new AppError("Authentication required.", 401);
  }

  const token = authorization.split(" ")[1];
  const decoded = jwt.verify(token, config.jwtSecret);

  const user = await User.findById(decoded.sub).select("-password");

  if (!user) {
    throw new AppError("The authenticated user no longer exists.", 401);
  }

  if (user.status !== USER_STATUSES.ACTIVE) {
    throw new AppError("Your account is inactive. Access denied.", 403);
  }

  req.user = user;
  next();
});

module.exports = {
  protect,
};
