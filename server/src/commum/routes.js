const { login, logout, state } = require("./handlers")
const { loginValidator } = require("./schemas")
const { auth } = require("../middleware")

const commumRoutes = (router, wrap) => {
  router.post("/login", loginValidator, wrap(login))
  router.get("/logout", wrap(auth), wrap(logout))
  router.get("/state", wrap(auth), wrap(state))
}

module.exports = {
  commumRoutes
}
