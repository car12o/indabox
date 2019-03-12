const winston = require('winston');
const { name } = require('../../config/default.json');

const errorStackFormat = winston.format(info => Object.assign({}, info, {
    stack: info.stack,
    message: info.message,
}));

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        errorStackFormat(),
        winston.format.timestamp(),
        winston.format.prettyPrint(),
    ),
    defaultMeta: { service: name },
    transports: [
        new winston.transports.File({ filename: './logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: './logs/combined.log' }),
    ],
});
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}

module.exports = logger;
