const winston = require("winston")
const config = require("../../config/default.json")

const errorStackFormat = winston.format((info) => ({
  ...info,
  stack: info.stack,
  message: info.message,
  payload: info.payload
}))

const logger = winston.createLogger({
  level: "debug",
  format: winston.format.combine(
    winston.format.timestamp(),
    errorStackFormat(),
  ),
  defaultMeta: { service: process.env.APP_NAME || config.APP_NAME },
  transports: [
    new winston.transports.File({ filename: "./logs/combined.log" }),
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize({
          all: true,
          colors: {
            debug: "white",
            error: "red",
            info: "green",
            warn: "yellow"
          }
        }),
        winston.format.simple(),
      )
    })
  ]
})

module.exports = logger
