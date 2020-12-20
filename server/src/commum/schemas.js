const Joi = require("@hapi/joi")
const { validator } = require("../middleware")

const loginValidator = validator.body(Joi.object().keys({
  email: Joi.string().email({ minDomainSegments: 2 }).trim().required(),
  password: Joi.string().min(6, "UTF-8").required()
}))

module.exports = {
  loginValidator
}
