const userService = require("../services/userService");

const createUser = async (req, res) => {
  const user = await userService.createUser(req.body);

  res.status(201).json({
    success: true,
    message: "User created successfully.",
    data: user,
  });
};

const getUsers = async (req, res) => {
  const users = await userService.getUsers();

  res.status(200).json({
    success: true,
    data: users,
  });
};

const getUserById = async (req, res) => {
  const user = await userService.getUserById(req.params.id);

  res.status(200).json({
    success: true,
    data: user,
  });
};

const updateUser = async (req, res) => {
  const user = await userService.updateUser(req.params.id, req.body);

  res.status(200).json({
    success: true,
    message: "User updated successfully.",
    data: user,
  });
};

const deleteUser = async (req, res) => {
  await userService.deleteUser(req.params.id);

  res.status(200).json({
    success: true,
    message: "User deleted successfully.",
  });
};

module.exports = {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
};
