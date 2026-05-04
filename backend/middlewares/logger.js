const winston = require('winston');
const expressWinston = require('express-winston');

// logs de requests
const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: 'logs/request.log' }),
  ],
  format: winston.format.json(),
});

// logs de errores
const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: 'logs/error.log' }),
  ],
  format: winston.format.json(),
});

module.exports = { requestLogger, errorLogger }