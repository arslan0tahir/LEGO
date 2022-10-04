const winston = require("winston");
var httpContext = require('express-http-context');
const { format, createLogger, transports }=winston;
const { combine, timestamp, label, printf } = format;
require('winston-daily-rotate-file')
const CATEGORY = "L1";


const customFormat = printf(({ level, message, label, timestamp }) => {
    let requestId=httpContext.get('requestId')
    if(requestId){
      return `${timestamp} [${requestId}][${label}] ${level}: ${message}`;
    }
    return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = winston.createLogger({
  level: "info",
  format: combine(label({ label: CATEGORY }), timestamp(), customFormat),
  transports: [
    new transports.Console(),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.DailyRotateFile({
        filename: 'logs/all-%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        level: 'silly'
    })
  ],
});

module.exports = logger;