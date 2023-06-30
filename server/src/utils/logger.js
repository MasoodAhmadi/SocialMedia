// importing libraries
const winston = require('winston');
const winstonDailyRotate = require('winston-daily-rotate-file');
// defining log files
const isProduction = process.env.NODE_ENV === 'production';
const logsFolder = isProduction ? 'logs_prod/' : 'logs/';
const transports = [];

transports.push(
  new winston.transports.File({
    filename: logsFolder + 'errors.log',
    level: 'error',
  })
);

transports.push(
  new winstonDailyRotate({
    filename: logsFolder + '%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    // zippedArchive: true,
    // maxSize: '20m',
    maxFiles: isProduction ? '14d' : '3d',
    level: 'info',
  })
);

const logger = winston.createLogger({
  level: isProduction ? 'info' : 'silly',
  exitOnError: false,
  format: winston.format.json(),
  transports: transports,
});

const getMetaData = (request) => {
  try {
    const meta = {};
    meta.time = new Date().toISOString();
    meta.requestMethod = request.method;
    meta.remoteIp =
      request.ip.indexOf(':') >= 0
        ? request.ip.substring(request.ip.lastIndexOf(':') + 1)
        : request.ip; // just ipv4
    meta.requestUrl = `${request.protocol}://${request.get('host')}${
      request.originalUrl
    }`;
    return meta;
  } catch (error) {
    console.error(error);
  }
};

const requestLogger = (req, res, next) => {
  try {
    logger.info('Api request', { ...getMetaData(req) });
    next();
  } catch (error) {
    next(error);
  }
};

const errorLogger = (err, req, res, next) => {
  const meta = {};
  meta.status = (err.status || err.statusCode) ?? 500;
  meta.trace = err?.trace ?? ' - ';
  const message = err?.message.toString() ?? err.toString();
  const extraMetaData = getMetaData(req);

  logger.error(message, { ...extraMetaData, ...meta });
  next(err);
};

module.exports = { logger, requestLogger, errorLogger };
