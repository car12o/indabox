const winston = require("winston")
const { name } = require("../../config/default.json")

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
  defaultMeta: { service: name },
  transports: [
    new winston.transports.File({ filename: "./logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "./logs/combined.log" })
  ]
})
if (process.env.NODE_ENV !== "production") {
  logger.add(new winston.transports.Console({
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
  }))
}

module.exports = logger
