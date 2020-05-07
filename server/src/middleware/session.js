const Joi = require("@hapi/joi")
const { APIError } = require("../services/error")
const { session } = require("../services/session")

const authSchema = Joi.string().uuid()

const assignSession = async (req, res, next) => {
  const authorization = req.get("Authorization")
  const token = authorization && authorization.split(" ")[1]
  const { error } = authSchema.validate(token)
  req.session = error
    ? await session.get()
    : await session.get(token)
  res.set("Authorization", req.session.token)
  res.set("Access-Control-Expose-Headers", "Content-Type, Authorization, X-Requested-With")
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
