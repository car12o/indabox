const { ValidationError } = require("../services/error")
const { verifyHash } = require("../services/crypto")
const { User, userRoles, userTitles, userCountries } = require("../user")

const login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.get({ email }, { password })
  if (!user || !verifyHash(password, user.password)) {
    req.session.set({ logged: false })
    throw new ValidationError([{ message: "Invalid credentials", path: ["email"] }])
  }

  const { password: _, ...session } = user
  req.session.set({ session, logged: true })
  res.json({ ...session, logged: true })
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
