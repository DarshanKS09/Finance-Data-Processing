const financialRecordService = require("../services/financialRecordService");

const createRecord = async (req, res) => {
  const record = await financialRecordService.createRecord(req.body, req.user._id);

  res.status(201).json({
    success: true,
    message: "Financial record created successfully.",
    data: record,
  });
};

const getRecords = async (req, res) => {
  const records = await financialRecordService.getRecords(req.query);

  res.status(200).json({
    success: true,
    data: records,
  });
};

const getRecordById = async (req, res) => {
  const record = await financialRecordService.getRecordById(req.params.id);

  res.status(200).json({
    success: true,
    data: record,
  });
};

const updateRecord = async (req, res) => {
  const record = await financialRecordService.updateRecord(req.params.id, req.body);

  res.status(200).json({
    success: true,
    message: "Financial record updated successfully.",
    data: record,
  });
};

const deleteRecord = async (req, res) => {
  await financialRecordService.deleteRecord(req.params.id);

  res.status(200).json({
    success: true,
    message: "Financial record deleted successfully.",
  });
};

module.exports = {
  createRecord,
  deleteRecord,
  getRecordById,
  getRecords,
  updateRecord,
};
