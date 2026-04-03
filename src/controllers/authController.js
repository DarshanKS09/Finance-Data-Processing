const authService = require("../services/authService");

const login = async (req, res) => {
  const result = await authService.login(req.body);

  res.status(200).json({
    success: true,
    message: "Login successful.",
    data: result,
  });
};

const getProfile = async (req, res) => {
  res.status(200).json({
    success: true,
    data: req.user,
  });
};

module.exports = {
  getProfile,
  login,
};
