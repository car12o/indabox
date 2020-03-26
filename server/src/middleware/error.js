const { log } = require("../services/logging")

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
  let error

  if (err.error) {
    error = handleValidationError(err)
    res.status(400).json(error)
    return
  }

  const { message, status, payload, type = "Error" } = err
  error = { message, type }
  if (payload) {
    error.payload = payload
  }

  if (!status || status === 500) {
    log.error(err)
  }

  res.status(status || 500).json(error)
}

module.exports = {
  errorHandler
}
