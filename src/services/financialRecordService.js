const FinancialRecord = require("../models/FinancialRecord");
const AppError = require("../utils/appError");

const buildRecordQuery = (filters = {}) => {
  const query = {};

  if (filters.type) {
    query.type = filters.type;
  }

  if (filters.category) {
    query.category = filters.category;
  }

  if (filters.startDate || filters.endDate) {
    query.date = {};

    if (filters.startDate) {
      query.date.$gte = new Date(filters.startDate);
    }

    if (filters.endDate) {
      query.date.$lte = new Date(filters.endDate);
    }
  }

  return query;
};

const createRecord = async (payload, userId) =>
  FinancialRecord.create({
    ...payload,
    createdBy: userId,
  });

const getRecords = async (filters = {}) =>
  FinancialRecord.find(buildRecordQuery(filters))
    .populate("createdBy", "name email role status")
    .sort({ date: -1, createdAt: -1 });

const getRecordById = async (recordId) => {
  const record = await FinancialRecord.findById(recordId).populate(
    "createdBy",
    "name email role status"
  );

  if (!record) {
    throw new AppError("Financial record not found.", 404);
  }

  return record;
};

const updateRecord = async (recordId, payload) => {
  const record = await FinancialRecord.findById(recordId);

  if (!record) {
    throw new AppError("Financial record not found.", 404);
  }

  Object.assign(record, payload);
  await record.save();

  return getRecordById(record._id);
};

const deleteRecord = async (recordId) => {
  const record = await FinancialRecord.findByIdAndDelete(recordId);

  if (!record) {
    throw new AppError("Financial record not found.", 404);
  }
};

module.exports = {
  buildRecordQuery,
  createRecord,
  deleteRecord,
  getRecordById,
  getRecords,
  updateRecord,
};
