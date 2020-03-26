const { ValidationError } = require("../services/error")
const { verifyHash } = require("../services/crypto")
const { User } = require("../user")

const login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email }).select("+password")
  if (!user || !verifyHash(password, user.password)) {
    req.session.set({ logged: false })
    throw new ValidationError([{ message: "Invalid credentials", path: ["email"] }])
  }

  const { password: _, ...session } = user.toObject()
  req.session.set({ user: session, logged: true })
  res.json(session)
}

const logout = async (req, res) => {
  req.session.set({ logged: false })
  res.json({ logged: false })
}

const state = async (req, res) => {
  const { user, logged } = req.session
  res.json({ user, logged })
}

module.exports = {
  login,
  logout,
  state
}
