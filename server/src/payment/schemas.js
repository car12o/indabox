const Joi = require("@hapi/joi")
const config = require("../../config/default.json")
const { validator } = require("../middleware")
const { paymentTypes } = require("../constants")

const getValidator = validator.query(Joi.object().keys({
  paymentDate: (value) => (value === "null" ? null : value)
}).unknown(true))

const createValidator = validator.body(Joi.object().keys({
  type: Joi.string().valid(...Object.values(paymentTypes)).required(),
  quotas: Joi.array().items(Joi.string().length(24)).required()
}))

const updateValidator = validator.body(Joi.object().keys({
  invoiceEmited: Joi.boolean()
}))

const ifthenValidator = validator.query(Joi.object().keys({
  chave: Joi.string().valid(config.IFTHEN_CALLBACK_KEY).messages({
    "any.only": "Invalid chave"
  }).required(),
  entidade: Joi.string().required(),
  referencia: Joi.string().required(),
  valor: Joi.number().required(),
  datahorapag: Joi.string().required(),
  terminal: Joi.string().required()
}))

module.exports = {
  createValidator,
  updateValidator,
  ifthenValidator,
  getValidator
}
