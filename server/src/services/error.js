class APIError extends Error {
  constructor(message, options = {}) {
    super()
    const { status, payload } = options
    this.message = message
    this.status = status || 500
    this.payload = payload || null
  }
}

module.exports = APIError
