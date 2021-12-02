const httpStatus = require('http-status');

const config = require('../config/config');
const APIError = require('./apiError');
const logger = require('../logger/winston');
const { DEVELOPMENT, TEST } = require('../constants');

const { env } = config;

module.exports = (err, req, res, next) => {
  if (env !== TEST) {
    // winston mutates arguments passed to it
    // https://github.com/winstonjs/winston/issues/1549
    logger.error({
      message: err.message,
      stack: err.stack,
    });
  }

  if (err instanceof APIError) {
    return res.status(err.status).send({
      message: err.message,
      stack: env === DEVELOPMENT ? err.stack : {},
    });
  }

  res
    .status(httpStatus.INTERNAL_SERVER_ERROR)
    .send('Something went wrong');
};
