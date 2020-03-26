const { get, getById, create, update } = require("./handlers")
const { auth, role } = require("../middleware")
const { userRoles } = require("./helpers")
const { createValidator, updateValidator } = require("./schemas")

const base = "/users"

const userRoutes = (router, wrap) => {
  router.get(`${base}/`, wrap(auth), wrap(role(userRoles.admin)), wrap(get))
  router.get(`${base}/:id`, wrap(auth), wrap(getById))
  router.post(`${base}/`, wrap(auth), wrap(role(userRoles.admin)), createValidator, wrap(create))
  router.put(`${base}/:id`, wrap(auth), updateValidator, wrap(update))
}

module.exports = {
  userRoutes
}
