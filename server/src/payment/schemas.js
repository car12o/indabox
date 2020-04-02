const Joi = require("@hapi/joi")
const { validator } = require("../middleware")
const { paymentTypes } = require("../constants")

const createValidator = validator.body(Joi.object().keys({
  type: Joi.string().valid(...Object.values(paymentTypes)).required(),
  quotas: Joi.array().items(Joi.string().length(24)).required()
}))

const updateValidator = validator.body(Joi.object().keys({
  invoiceEmited: Joi.boolean()
}))

module.exports = {
  createValidator,
  updateValidator
}
