/**
 * Created by dcreey on 9/24/2016.
 */
import winston from 'winston';
import expressWinston from 'express-winston';

const fs = require('fs');

const env = process.env.NODE_ENV || 'development';
const logDir = 'log';
const logLevel = env === 'development' ? 'verbose' : 'info';

//winston.emitErrs = true;

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const tsFormat = () => (new Date()).toLocaleTimeString();

//const logger = new (winston.Logger)({
//  transports: [
//    // colorize the output to the console
//    new (winston.transports.Console)({
//      timestamp: tsFormat,
//      colorize: true,
//      level: logLevel,
//    }),
//    new (require('winston-daily-rotate-file'))({ // eslint-disable-line global-require
//      filename: `${logDir}/-results.log`,
//      timestamp: tsFormat,
//      datePattern: 'yyyy-MM-dd',
//      prepend: true,
//      level: logLevel,
//    }),
//  ],
//});
//
//logger.debug('Debugging info');
//logger.verbose('Verbose info');
//logger.info('Hello world');
//logger.warn('Warning message');
//logger.error('Error info');
//
//module.exports = logger;
//module.exports.stream = {
//  write(message, encoding) {
//    logger.info(message);
//  },
//};

const logger = {};

logger.routeLogger = expressWinston.logger({
  transports: [
    new winston.transports.Console({
      json: true,
      colorize: true,
    }),
    new (require('winston-daily-rotate-file'))({ // eslint-disable-line global-require
      filename: `${logDir}/-results.log`,
      timestamp: tsFormat,
      datePattern: 'yyyy-MM-dd',
      prepend: true,
      level: logLevel,
    }),
  ],
  meta: true, // control whether you want to log the meta data about the request
  msg: 'HTTP {{res.statusCode}} {{req.method}} {{req.url}}', // {{res.responseTime}}ms
  expressFormat: true, // Use the default Express/morgan request formatting.
  colorize: true,
 // ignoreRoute(req, res) { return false; },
})

logger.errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.Console({
      json: true,
      colorize: true,
    }),
    new (require('winston-daily-rotate-file'))({ // eslint-disable-line global-require
      filename: `${logDir}/-results.log`,
      timestamp: tsFormat,
      datePattern: 'yyyy-MM-dd',
      prepend: true,
      level: logLevel,
    }),
  ],
})

export default logger;
