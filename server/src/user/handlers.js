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
  const { user } = req.session

  if (user.role > userRoles.admin && id !== user._id) {
    throw new APIError("Forbidden", 403)
  }

  const _user = await User.findById(id)
  res.json(_user)
}

const create = async (req, res) => {
  const { password, ...body } = req.body
  const { user } = req.session

  const _user = {
    ...body,
    password: hashPassword(password),
    createdBy: user._id,
    updatedBy: user._id
  }

  const usr = await User.create(_user)
  const { password: _, ...rest } = usr.toObject()
  res.json(rest)
}

const update = async (req, res) => {
  const { body: { password, ...body }, params: { id } } = req
  const { user } = req.session

  if (user.role > userRoles.admin && id !== user._id) {
    throw new APIError("Forbidden", 403)
  }

  const _user = {
    ...body,
    updatedBy: user._id
  }

  if (password) {
    _user.password = hashPassword(password)
  }

  const usr = await User.findByIdAndUpdate(id, _user, { new: true })
  res.json(usr)
}

module.exports = {
  get,
  getById,
  create,
  update
}
