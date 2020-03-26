const { APIError } = require("../services/error")
const { hashPassword } = require("../services/crypto")
const { User } = require("./model")
const { userRoles } = require("./helpers")

const get = async (req, res) => {
  const users = await User.find()
  res.json(users)
}

const getById = async (req, res) => {
  const { id } = req.params
  const { user: { _id, role } } = req.session

  if (role > userRoles.admin && id !== _id) {
    throw new APIError("Forbidden", 403)
  }

  const user = await User.findById(id)
  res.json(user)
}

const create = async (req, res) => {
  const { password, ...body } = req.body
  const { user: { _id } } = req.session

  body.password = hashPassword(password)
  body.createdBy = _id
  body.updatedBy = _id

  const user = await User.create(body)
  const { password: _, ...rest } = user.toObject()
  res.json(rest)
}

const update = async (req, res) => {
  const { body, params: { id } } = req
  const { user: { _id, role } } = req.session

  if (role > userRoles.admin && id !== _id) {
    throw new APIError("Forbidden", 403)
  }

  body.updatedBy = _id

  const user = await User.findByIdAndUpdate(id, body, { new: true })
  res.json(user)
}

module.exports = {
  get,
  getById,
  create,
  update
}
