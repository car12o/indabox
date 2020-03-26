const Joi = require("@hapi/joi")
const { validator } = require("../middleware")
const { paymentTypes } = require("./helpers")

const createValidator = validator.body(Joi.object().keys({
  type: Joi.string().valid(...Object.values(paymentTypes)).required(),
  value: Joi.number().min(0).required(),
  quotas: Joi.array().items(Joi.string().length(24)).required()
}))

module.exports = {
  createValidator
}
