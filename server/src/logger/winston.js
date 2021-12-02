const winston = require('winston');

const config = require('../config/config');
const { DEVELOPMENT } = require('../constants');

// const levels = {
//   error: 0,
//   warn: 1,
//   info: 2,
//   http: 3,
//   debug: 4,
// };

const level = () => {
  const env = process.env.NODE_ENV || DEVELOPMENT;
  const isDevelopment = env === DEVELOPMENT;
  return isDevelopment ? 'debug' : 'warn';
};

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};

// winston.addColors(colors);

const format = winston.format.combine(
  winston.format.label({ label: config.logLabel }),
  winston.format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss:ms',
  }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    info =>
      `${info.label} ${info.timestamp} ${info.level}: ${info.message}`
  )
);

const transports = [new winston.transports.Console()];

const logger = winston.createLogger({
  level: level(),
  // levels,
  format,
  transports,
});

module.exports = logger;
