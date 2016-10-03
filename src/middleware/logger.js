/**
 * Created by dcreey on 9/24/2016.
 */
import winston from 'winston';
import expressWinston from 'express-winston';

winston.transports.DailyRotateFile = require('winston-daily-rotate-file');

const fs = require('fs');

const env = process.env.NODE_ENV || 'development';
const logDir = 'log';
const logLevel = env === 'development' ? 'verbose' : 'info';

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// const tsFormat = () => (new Date()).toLocaleTimeString();

const logger = {};

logger.routeLogger = expressWinston.logger({
  transports: [
    new winston.transports.DailyRotateFile({
      name: 'file',
      datePattern: 'yyyy-MM-dd',
      colorize: true,
      json: true,
      filename: `${logDir}/-results.log`,
      maxsize: 50 * 1024 * 1024,
      maxFiles: 10,
      zippedArchive: true,
      prepend: true,
    }),
    new winston.transports.Console({
      json: true,
      colorize: true,
    }),
    // new (require('winston-daily-rotate-file'))({ // eslint-disable-line global-require
    //  filename: `${logDir}/-results.log`,
    //  timestamp: tsFormat,
    //  datePattern: 'yyyy-MM-dd',
    //  prepend: true,
    //  level: logLevel,
    // }),
  ],
  meta: true, // control whether you want to log the meta data about the request
  msg: 'HTTP {{res.statusCode}} {{req.method}} {{req.url}}', // {{res.responseTime}}ms
  expressFormat: true, // Use the default Express/morgan request formatting.
  colorize: true,
 // ignoreRoute(req, res) { return false; },
})

logger.errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.DailyRotateFile({
      name: 'file',
      datePattern: 'yyyy-MM-dd',
      colorize: true,
      json: true,
      filename: `${logDir}/-errors.log`,
      maxsize: 50 * 1024 * 1024,
      maxFiles: 10,
      zippedArchive: true,
      prepend: true,
    }),
    new winston.transports.Console({
      json: true,
      colorize: true,
    }),
    // new (require('winston-daily-rotate-file'))({ // eslint-disable-line global-require
    //  filename: `${logDir}/-results.log`,
    //  timestamp: tsFormat,
    //  datePattern: 'yyyy-MM-dd',
    //  prepend: true,
    //  level: logLevel,
    // }),
  ],
})

export default logger;
