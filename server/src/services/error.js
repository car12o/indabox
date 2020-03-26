/* eslint-disable max-classes-per-file */
class APIError extends Error {
  constructor(message, status, payload) {
    super()
    this.type = "APIError"
    this.message = message
    this.status = status || 500
    this.payload = payload
  }
}

class ValidationError extends Error {
  constructor(details) {
    super()
    this.type = "ValidationError"
    this.error = { details }
  }
}

module.exports = {
  APIError,
  ValidationError
}
