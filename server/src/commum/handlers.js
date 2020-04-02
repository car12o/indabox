const { ValidationError } = require("../services/error")
const { verifyHash } = require("../services/crypto")
const { User } = require("../user")
const { userRoles, userTitles, userCountries } = require("../constants")

const login = async (req, res) => {
  const { email, password } = req.body
  const _user = await User.get({ email }, { password })
  if (!_user || !verifyHash(password, _user.password)) {
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
  res.json({
    roles: userRoles,
    titles: userTitles,
    countries: userCountries
  })
}

module.exports = {
  login,
  logout,
  state,
  metadata
}
