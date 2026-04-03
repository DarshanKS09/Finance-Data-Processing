const bcrypt = require("bcryptjs");
const User = require("../models/User");
const AppError = require("../utils/appError");

const SALT_ROUNDS = 12;

const getUsers = async () =>
  User.find().select("-password").sort({ createdAt: -1 });

const getUserById = async (userId) => {
  const user = await User.findById(userId).select("-password");

  if (!user) {
    throw new AppError("User not found.", 404);
  }

  return user;
};

const createUser = async (payload) => {
  const existingUser = await User.findOne({ email: payload.email.toLowerCase() });

  if (existingUser) {
    throw new AppError("Email already exists.", 409);
  }

  const hashedPassword = await bcrypt.hash(payload.password, SALT_ROUNDS);

  const user = await User.create({
    ...payload,
    email: payload.email.toLowerCase(),
    password: hashedPassword,
  });

  return User.findById(user._id).select("-password");
};

const updateUser = async (userId, payload) => {
  const user = await User.findById(userId).select("+password");

  if (!user) {
    throw new AppError("User not found.", 404);
  }

  if (payload.email && payload.email.toLowerCase() !== user.email) {
    const existingUser = await User.findOne({ email: payload.email.toLowerCase() });
    if (existingUser) {
      throw new AppError("Email already exists.", 409);
    }
  }

  if (payload.password) {
    payload.password = await bcrypt.hash(payload.password, SALT_ROUNDS);
  }

  Object.assign(user, {
    ...payload,
    ...(payload.email && { email: payload.email.toLowerCase() }),
  });

  await user.save();

  return User.findById(user._id).select("-password");
};

const deleteUser = async (userId) => {
  const user = await User.findByIdAndDelete(userId);

  if (!user) {
    throw new AppError("User not found.", 404);
  }
};

module.exports = {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
};
