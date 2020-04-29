const { ValidationError } = require("../services/error")
const { verifyHash } = require("../services/crypto")
const { User } = require("../user")
const { Quota } = require("../quota")
const { Payment } = require("../payment")
const { userRoles, userRolesText, userTitles, userCountries } = require("../constants")

const login = async (req, res) => {
  const { email, password } = req.body
  const _user = await User.get({ email }, { password })
  if (!_user || !verifyHash(password, _user.password) || _user.role > userRoles.admin) {
    req.session.set({ logged: false })
    throw new ValidationError([{ message: "Invalid credentials", path: ["email"] }])
  }

  const { password: _, ...user } = _user
  req.session.set({ user, logged: true })
  res.json({ ...user, logged: true })
}

const logout = async (req, res) => {
  req.session.set({ logged: false })
  res.json({ logged: false })
}

const state = async (req, res) => {
  const { user, logged } = req.session
  const _user = await User.get({ _id: user._id })
  res.json({ ..._user, logged })
}

const metadata = async (req, res) => {
  const { user } = req.session

  res.json({
    roles: Object.entries(userRolesText)
      .map(([value, label]) => ({ value: Number(value), label }))
      .filter(({ value }) => value >= user.role),
    titles: Object.values(userTitles).map((label) => ({ label, value: label })),
    countries: Object.values(userCountries).map((label) => ({ label, value: label }))
  })
}

const totals = async (req, res) => {
  const { year } = req.query
  const users = await User.find({ role: 20 }).count()

  const paymentMissingFilter = (year && { payment: null, year }) || { payment: null }
  const paymentMissing = await Quota.find(paymentMissingFilter).count()

  const paymentsFilter = (year && { deletedAt: null, quotasYear: year }) || { deletedAt: null }
  const payments = await Payment.find(paymentsFilter).lean()
  const paymentReceived = payments.filter(({ paymentDate }) => paymentDate).length
  const paymentWaiting = payments.filter(({ paymentDate }) => !paymentDate).length

  res.json({ users, paymentReceived, paymentWaiting, paymentMissing })
}

module.exports = {
  login,
  logout,
  state,
  metadata,
  totals
}
