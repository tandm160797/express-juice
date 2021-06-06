import path from 'path';
import winston from 'winston';
import { isDevelopment } from '$utils';
import { errorResponses } from '$common/responses';

const level = () => {
	return isDevelopment ? 'debug' : 'warn';
};

const transports = [
	new winston.transports.Console(),
	new winston.transports.File({ filename: path.join(path.resolve(), 'src/logs/all.log') }),
	new winston.transports.File({ filename: path.join(path.resolve(), 'src/logs/errors.log'), level: 'error' })
];

const format = winston.format.combine(
	winston.format.json(),
	winston.format.timestamp({ format: 'DD-MM-YY HH:mm:ss' }),
	winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
);

const logger = winston.createLogger({
	level: level(),
	format,
	transports
});

const errorHandler = (err, req, res, next) => {
	const stack = err.stack.split('\n');
	stack.shift();
	const errMsg = err.message;
	const stackErr = stack.map((at) => at.replace('    at', 'at'));
	const topStack = stackErr[0].split(',')[0];

	logger.error(`${errMsg} ${topStack}`);

	return errorResponses(res, { errMsg, topStack }, 'server-error', 500);
};

export default errorHandler;
