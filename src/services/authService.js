const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const config = require("../config/env");
const AppError = require("../utils/appError");
const { USER_STATUSES } = require("../utils/constants");

const buildAuthResponse = (user) => {
  const token = jwt.sign({ sub: user._id, role: user.role }, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn,
  });

  return {
    token,
    user,
  };
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ email: email.toLowerCase() }).select("+password");

  if (!user) {
    throw new AppError("Invalid email or password.", 401);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new AppError("Invalid email or password.", 401);
  }

  if (user.status !== USER_STATUSES.ACTIVE) {
    throw new AppError("Your account is inactive. Please contact an administrator.", 403);
  }

  const sanitizedUser = await User.findById(user._id).select("-password");
  return buildAuthResponse(sanitizedUser);
};

module.exports = {
  login,
};
