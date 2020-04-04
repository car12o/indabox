const Joi = require("@hapi/joi")
const { validator } = require("../middleware")

const getValidator = validator.query(Joi.object().keys({
  payment: Joi.string().custom((value) => (value === "null" ? null : value))
}))

module.exports = {
  getValidator
}
