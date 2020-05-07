const { log } = require("../services/logging")
const { slack } = require("../services/slack")

const handleValidationError = ({ error: { details } }) => {
  const type = "ValidationError"
  const payload = details.map(({ message, path }) => ({
    message,
    path: path.join(".")
  }))

  return { type, payload }
}

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  log.error(err)

  if (err.error) {
    const error = handleValidationError(err)
    res.status(400).json(error)
    return
  }

  const { message, status, payload, type = "Error" } = err
  const error = { message, type }
  if (payload) {
    error.payload = payload
  }

  slack.send(error)
  res.status(status || 500).json(error)
}

module.exports = {
  errorHandler
}
