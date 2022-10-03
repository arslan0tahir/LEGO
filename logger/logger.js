const winston = require("winston");

const { format, createLogger, transports }=winston;
const { combine, timestamp, label, printf } = format;
require('winston-daily-rotate-file')
const CATEGORY = "lego-format";


const customFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = winston.createLogger({
  level: "debug",
  format: combine(label({ label: CATEGORY }), timestamp(), customFormat),
  transports: [
    new transports.Console(),
    new winston.transports.File({ filename: '../logs/error.log', level: 'error' }),
    new winston.transports.DailyRotateFile({
        filename: '../logs/combined-%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m'
    })
  ],
});

module.exports = logger;