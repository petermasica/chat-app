require('dotenv').config();
const joi = require('joi');

const envVarSchema = joi.object({
  NODE_ENV: joi
    .any()
    .valid('development', 'test', 'production')
    .default('development'),
  PORT: joi.number().default(7000),
  LOG_LABEL: joi.string().default('chat-api'),
});

const { error, value: envVars } = envVarSchema.validate(
  process.env,
  { allowUnknown: true }
);

if (error) {
  throw new Error(
    `Config validation error: ${error.message}`
  );
}

const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  logLabel: envVars.LOG_LABEL,
};

module.exports = config;
