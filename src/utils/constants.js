const USER_ROLES = Object.freeze({
  ADMIN: "admin",
  ANALYST: "analyst",
  VIEWER: "viewer",
});

const USER_STATUSES = Object.freeze({
  ACTIVE: "active",
  INACTIVE: "inactive",
});

const RECORD_TYPES = Object.freeze({
  INCOME: "income",
  EXPENSE: "expense",
});

module.exports = {
  USER_ROLES,
  USER_STATUSES,
  RECORD_TYPES,
};
