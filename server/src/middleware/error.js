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
  slack.send(err, { log })

  if (err.error) {
    const error = handleValidationError(err)
    res.status(400).json(error)
    return
  }

  const { status = 500, message, type = "Error", payload } = err
  const error = { message, type }
  if (payload) {
    error.payload = payload
  }

  res.status(status).json(error)
}

module.exports = {
  errorHandler
}
