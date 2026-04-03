const dotenv = require("dotenv");

dotenv.config();

const requiredVariables = ["PORT", "MONGO_URI", "JWT_SECRET", "JWT_EXPIRES_IN"];

requiredVariables.forEach((variableName) => {
  if (!process.env[variableName]) {
    throw new Error(`Missing required environment variable: ${variableName}`);
  }
});

module.exports = {
  port: Number(process.env.PORT) || 5000,
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
  nodeEnv: process.env.NODE_ENV || "development",
};
