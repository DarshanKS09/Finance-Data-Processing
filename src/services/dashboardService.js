const FinancialRecord = require("../models/FinancialRecord");
const { buildRecordQuery } = require("./financialRecordService");

const getDashboardInsights = async (filters = {}) => {
  const matchStage = buildRecordQuery(filters);

  const [result] = await FinancialRecord.aggregate([
    { $match: matchStage },
    {
      $facet: {
        summary: [
          {
            $group: {
              _id: null,
              totalIncome: {
                $sum: {
                  $cond: [{ $eq: ["$type", "income"] }, "$amount", 0],
                },
              },
              totalExpense: {
                $sum: {
                  $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0],
                },
              },
            },
          },
          {
            $project: {
              _id: 0,
              totalIncome: 1,
              totalExpense: 1,
              netBalance: { $subtract: ["$totalIncome", "$totalExpense"] },
            },
          },
        ],
        categoryTotals: [
          {
            $group: {
              _id: {
                category: "$category",
                type: "$type",
              },
              total: { $sum: "$amount" },
            },
          },
          {
            $project: {
              _id: 0,
              category: "$_id.category",
              type: "$_id.type",
              total: 1,
            },
          },
          { $sort: { total: -1, category: 1 } },
        ],
        monthlyTrends: [
          {
            $group: {
              _id: {
                year: { $year: "$date" },
                month: { $month: "$date" },
              },
              totalIncome: {
                $sum: {
                  $cond: [{ $eq: ["$type", "income"] }, "$amount", 0],
                },
              },
              totalExpense: {
                $sum: {
                  $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0],
                },
              },
            },
          },
          {
            $project: {
              _id: 0,
              year: "$_id.year",
              month: "$_id.month",
              totalIncome: 1,
              totalExpense: 1,
              netBalance: { $subtract: ["$totalIncome", "$totalExpense"] },
            },
          },
          { $sort: { year: 1, month: 1 } },
        ],
      },
    },
  ]);

  return {
    summary: result?.summary?.[0] || {
      totalIncome: 0,
      totalExpense: 0,
      netBalance: 0,
    },
    categoryTotals: result?.categoryTotals || [],
    monthlyTrends: result?.monthlyTrends || [],
  };
};

module.exports = {
  getDashboardInsights,
};
