const dashboardService = require("../services/dashboardService");

const getInsights = async (req, res) => {
  const insights = await dashboardService.getDashboardInsights(req.query);

  res.status(200).json({
    success: true,
    data: insights,
  });
};

module.exports = {
  getInsights,
};
