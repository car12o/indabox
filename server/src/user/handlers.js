const { APIError } = require("../services/error")
const { User } = require("./model")
const { randomPassword, genQuota } = require("./helpers")
const { userRoles } = require("../constants")

const get = async (req, res) => {
  const { user } = req.session
  const users = await User.getMany({ role: { $gte: user.role } }, req.query)
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
  const { body, session: { user } } = req

  const { password, ...rest } = await User.store({ ...body, password: randomPassword() }, user)
  let _user = rest
  if (_user.role >= 20) {
    const { number } = await User.findOne().sort({ number: "desc" }).lean()
    const quota = await genQuota(_user)
    _user = await User.update({ _id: _user._id }, {
      number: parseInt(number, 10) + 1,
      $push: { quotas: quota._id }
    }, user._id)
  }

  res.json(_user)
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
