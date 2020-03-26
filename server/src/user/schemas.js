const Joi = require("@hapi/joi")
const { validator } = require("../middleware")
const { userRoles, userTitle, userCountries } = require("./helpers")

const createValidator = validator.body(Joi.object().keys({
  role: Joi.number().valid(...Object.values(userRoles)).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().min(6, "UTF-8").required(),
  rePassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "password must match"
  }),
  firstName: Joi.string().required()
}))

const updateValidator = validator.body(Joi.object().keys({
  role: Joi.number().valid(...Object.values(userRoles)),
  email: Joi.string().email({ minDomainSegments: 2 }),
  password: Joi.string().min(6, "UTF-8"),
  rePassword: Joi.string().valid(Joi.ref("password")).messages({
    "any.only": "password must match"
  }),
  firstName: Joi.string(),
  lastName: Joi.string(),
  number: Joi.number(),
  title: Joi.string().valid(...Object.values(userTitle)),
  nif: Joi.string().min(9, "UTF-8").max(9, "UTF-8"),
  phone: Joi.string().min(9, "UTF-8").max(15, "UTF-8"),
  mobile: Joi.string().min(9, "UTF-8").max(15, "UTF-8"),
  address: {
    road: Joi.string().max(50, "UTF-8"),
    postCode: Joi.string().min(4, "UTF-8").max(10, "UTF-8"),
    city: Joi.string().max(30, "UTF-8"),
    country: Joi.number().valid(...Object.values(userCountries))
  },
  billing: {
    address: {
      road: Joi.string().max(50, "UTF-8"),
      postCode: Joi.string().min(4, "UTF-8").max(10, "UTF-8"),
      city: Joi.string().max(30, "UTF-8"),
      country: Joi.number().valid(...Object.values(userCountries))
    },
    name: Joi.string(),
    nif: Joi.string().min(9, "UTF-8").max(9, "UTF-8"),
    active: Joi.boolean()
  },
  ballotNumber: Joi.string(),
  specialty: Joi.string(),
  specialtySessions: Joi.string(),
  newsletter: Joi.boolean(),
  alerts: Joi.boolean(),
  notes: Joi.string()
}))

module.exports = {
  createValidator,
  updateValidator
}
