const { get, create, update, del, ifthen } = require("./handlers")
const { auth, role } = require("../middleware")
const { userRoles } = require("../constants")
const { createValidator, updateValidator, ifthenValidator } = require("./schemas")

const base = "/payments"

const paymentRoutes = (router, wrap) => {
  router.get(`${base}/`, wrap(auth), wrap(role(userRoles.admin)), wrap(get))
  router.post(`${base}/`, wrap(auth), wrap(role(userRoles.admin)), createValidator, wrap(create))
  router.put(`${base}/:_id`, wrap(auth), wrap(role(userRoles.admin)), updateValidator, wrap(update))
  router.delete(`${base}/:_id`, wrap(auth), wrap(role(userRoles.admin)), wrap(del))
  router.get(`/ifthen${base}/callback`, ifthenValidator, wrap(ifthen))
}

module.exports = {
  paymentRoutes
}
