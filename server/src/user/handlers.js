const { APIError } = require("../services/error")
const { User } = require("./model")
const { userRoles } = require("../constants")

const get = async (req, res) => {
  const users = await User.getMany()
  res.json(users)
}

const getById = async (req, res) => {
  const { _id } = req.params
  const { user } = req.session

  if (user.role > userRoles.admin && _id !== user._id) {
    throw new APIError("Forbidden", 403)
  }

  const _user = await User.get({ _id })
  res.json(_user)
}

const create = async (req, res) => {
  const { password, ...body } = req.body
  const { user } = req.session

  const _user = await User.store(body, user._id)
  const { password: _, ...rest } = _user
  res.json(rest)
}

const update = async (req, res) => {
  const { body, params: { _id } } = req
  const { user } = req.session

  const _user = await User.update({ _id }, body, user._id)
  res.json(_user)
}

const del = async (req, res) => {
  const { _id } = req.params
  const { user } = req.session

  const _user = await User.del(_id, {}, user._id)
  res.json(_user)
}

module.exports = {
  get,
  getById,
  create,
  update,
  del
}
