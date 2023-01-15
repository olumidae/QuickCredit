import { existsSync, mkdirSync } from 'fs';
import { Logger } from 'winston';
import winston = require('winston');

const logDir = './logs';

if (!existsSync(logDir)) {
	mkdirSync(logDir);
}
const myFormat = winston.format.combine(
    winston.format.colorize(),
    winston.format.printf(info => `${info.level}: ${info.message}`)
)


export const logger: Logger = winston.createLogger({
    format: myFormat,
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: `${logDir}/combined.log` }),
    ]
})


