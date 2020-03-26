const { APIError } = require("../services/error")
const { session } = require("../services/session")

const assignSession = async (req, res, next) => {
  const authorization = req.get("Authorization")
  const token = authorization && authorization.split(" ")[1]
  req.session = await session.get(token)
  res.set("Authorization", req.session.token)
  res.set("Access-Control-Expose-Headers", "Content-Type, Token, X-Requested-With")
  return next()
}

const auth = async (req, res, next) => {
  const { logged } = req.session
  if (!logged) {
    throw new APIError("Unauthorized", 401)
  }

  return next()
}

const role = (role) => async (req, res, next) => {
  const { user } = req.session
  if (user.role > role) {
    throw new APIError("Forbidden", 403)
  }

  return next()
}

module.exports = {
  assignSession,
  auth,
  role
}
