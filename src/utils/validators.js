const mongoose = require("mongoose");
const AppError = require("./appError");
const { USER_ROLES, USER_STATUSES, RECORD_TYPES } = require("./constants");

const isNonEmptyString = (value) =>
  typeof value === "string" && value.trim().length > 0;

const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim().toLowerCase());

const isValidObjectId = (value) => mongoose.Types.ObjectId.isValid(value);

const ensureAllowedFields = (payload, allowedFields) => {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    throw new AppError("Request payload must be a valid JSON object.", 400);
  }

  const unexpectedFields = Object.keys(payload).filter(
    (field) => !allowedFields.includes(field)
  );

  if (unexpectedFields.length > 0) {
    throw new AppError(
      `Unexpected fields: ${unexpectedFields.join(", ")}`,
      400
    );
  }
};

const validateUserPayload = (payload, { partial = false } = {}) => {
  ensureAllowedFields(payload, ["name", "email", "password", "role", "status"]);

  if (partial && Object.keys(payload).length === 0) {
    throw new AppError("At least one user field must be provided for update.", 400);
  }

  if (!partial || payload.name !== undefined) {
    if (!isNonEmptyString(payload.name)) {
      throw new AppError("Name is required and must be a non-empty string.", 400);
    }
  }

  if (!partial || payload.email !== undefined) {
    if (!isValidEmail(payload.email)) {
      throw new AppError("A valid email address is required.", 400);
    }
  }

  if (!partial || payload.password !== undefined) {
    if (typeof payload.password !== "string" || payload.password.length < 8) {
      throw new AppError(
        "Password is required and must be at least 8 characters long.",
        400
      );
    }
  }

  if (payload.role !== undefined && !Object.values(USER_ROLES).includes(payload.role)) {
    throw new AppError("Role must be one of: admin, analyst, viewer.", 400);
  }

  if (
    payload.status !== undefined &&
    !Object.values(USER_STATUSES).includes(payload.status)
  ) {
    throw new AppError("Status must be either active or inactive.", 400);
  }
};

const validateLoginPayload = (payload) => {
  ensureAllowedFields(payload, ["email", "password"]);

  if (!isValidEmail(payload.email)) {
    throw new AppError("A valid email address is required.", 400);
  }

  if (typeof payload.password !== "string" || payload.password.length === 0) {
    throw new AppError("Password is required.", 400);
  }
};

const validateRecordPayload = (payload, { partial = false } = {}) => {
  ensureAllowedFields(payload, ["amount", "type", "category", "date", "notes"]);

  if (partial && Object.keys(payload).length === 0) {
    throw new AppError("At least one record field must be provided for update.", 400);
  }

  if (!partial || payload.amount !== undefined) {
    if (typeof payload.amount !== "number" || Number.isNaN(payload.amount) || payload.amount <= 0) {
      throw new AppError("Amount is required and must be a positive number.", 400);
    }
  }

  if (!partial || payload.type !== undefined) {
    if (!Object.values(RECORD_TYPES).includes(payload.type)) {
      throw new AppError("Type must be either income or expense.", 400);
    }
  }

  if (!partial || payload.category !== undefined) {
    if (!isNonEmptyString(payload.category)) {
      throw new AppError("Category is required and must be a non-empty string.", 400);
    }
  }

  if (!partial || payload.date !== undefined) {
    const parsedDate = new Date(payload.date);
    if (Number.isNaN(parsedDate.getTime())) {
      throw new AppError("Date is required and must be a valid date.", 400);
    }
  }

  if (payload.notes !== undefined && typeof payload.notes !== "string") {
    throw new AppError("Notes must be a string.", 400);
  }
};

const validateRecordFilters = (filters) => {
  ensureAllowedFields(filters, ["type", "category", "startDate", "endDate"]);

  if (filters.category !== undefined && !isNonEmptyString(filters.category)) {
    throw new AppError("Category filter must be a non-empty string.", 400);
  }

  if (filters.type && !Object.values(RECORD_TYPES).includes(filters.type)) {
    throw new AppError("Type filter must be either income or expense.", 400);
  }

  if (filters.startDate && Number.isNaN(new Date(filters.startDate).getTime())) {
    throw new AppError("startDate must be a valid date.", 400);
  }

  if (filters.endDate && Number.isNaN(new Date(filters.endDate).getTime())) {
    throw new AppError("endDate must be a valid date.", 400);
  }

  if (filters.startDate && filters.endDate) {
    const startDate = new Date(filters.startDate);
    const endDate = new Date(filters.endDate);

    if (startDate > endDate) {
      throw new AppError("startDate cannot be later than endDate.", 400);
    }
  }
};

module.exports = {
  ensureAllowedFields,
  isValidObjectId,
  validateLoginPayload,
  validateRecordFilters,
  validateRecordPayload,
  validateUserPayload,
};
