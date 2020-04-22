const { get, getById, create, update, del } = require("./handlers")
const { auth, role } = require("../middleware")
const { userRoles } = require("../constants")
const { createValidator, updateValidator } = require("./schemas")

const base = "/users"

const userRoutes = (router, wrap) => {
  router.get(`${base}/`, wrap(auth), wrap(role(userRoles.admin)), wrap(get))
  router.get(`${base}/:_id`, wrap(auth), wrap(getById))
  router.post(`${base}/`, wrap(auth), wrap(role(userRoles.admin)), createValidator, wrap(create))
  router.put(`${base}/:_id`, wrap(auth), wrap(role(userRoles.admin)), updateValidator, wrap(update))
  router.delete(`${base}/:_id`, wrap(auth), wrap(role(userRoles.admin)), wrap(del))
}

module.exports = {
  userRoutes
}
