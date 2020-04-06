const { login, logout, state, metadata, totals } = require("./handlers")
const { loginValidator } = require("./schemas")
const { auth, role } = require("../middleware")
const { userRoles } = require("../constants")

const commumRoutes = (router, wrap) => {
  router.post("/login", loginValidator, wrap(login))
  router.get("/logout", wrap(auth), wrap(logout))
  router.get("/state", wrap(auth), wrap(state))
  router.get("/metadata", wrap(auth), wrap(metadata))
  router.get("/totals", wrap(auth), wrap(role(userRoles.admin)), wrap(totals))
}

module.exports = {
  commumRoutes
}
