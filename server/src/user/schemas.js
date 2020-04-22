const Joi = require("@hapi/joi")
const { validator } = require("../middleware")
const { userRoles, userTitles, userCountries } = require("../constants")

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
  lastName: Joi.string().allow(""),
  number: Joi.number(),
  title: Joi.string().valid(...Object.values(userTitles)),
  nif: Joi.string().min(9, "UTF-8").max(9, "UTF-8").allow(""),
  phone: Joi.string().min(9, "UTF-8").max(15, "UTF-8").allow(""),
  mobile: Joi.string().min(9, "UTF-8").max(15, "UTF-8").allow(""),
  address: {
    road: Joi.string().max(50, "UTF-8").allow(""),
    postCode: Joi.string().min(4, "UTF-8").max(10, "UTF-8").allow(""),
    city: Joi.string().max(30, "UTF-8").allow(""),
    country: Joi.number().valid(...Object.values(userCountries))
  },
  billing: {
    address: {
      road: Joi.string().max(50, "UTF-8").allow(""),
      postCode: Joi.string().min(4, "UTF-8").max(10, "UTF-8").allow(""),
      city: Joi.string().max(30, "UTF-8").allow(""),
      country: Joi.number().valid(...Object.values(userCountries)).allow("")
    },
    name: Joi.string(),
    nif: Joi.string().min(9, "UTF-8").max(9, "UTF-8").allow(""),
    active: Joi.boolean()
  },
  ballotNumber: Joi.string().allow(""),
  specialty: Joi.string().allow(""),
  specialtySessions: Joi.string().allow(""),
  newsletter: Joi.boolean(),
  notes: Joi.string().allow("")
}))

module.exports = {
  createValidator,
  updateValidator
}
