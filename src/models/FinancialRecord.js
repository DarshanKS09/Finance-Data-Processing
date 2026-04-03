const mongoose = require("mongoose");
const { RECORD_TYPES } = require("../utils/constants");

const financialRecordSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: [true, "Amount is required."],
      min: [0.01, "Amount must be greater than zero."],
    },
    type: {
      type: String,
      enum: Object.values(RECORD_TYPES),
      required: [true, "Type is required."],
    },
    category: {
      type: String,
      required: [true, "Category is required."],
      trim: true,
      maxlength: [100, "Category cannot exceed 100 characters."],
    },
    date: {
      type: Date,
      required: [true, "Date is required."],
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [500, "Notes cannot exceed 500 characters."],
      default: "",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

financialRecordSchema.index({ type: 1, category: 1, date: -1 });

module.exports = mongoose.model("FinancialRecord", financialRecordSchema);
