const { create, update, del } = require("./handlers")
const { auth, role } = require("../middleware")
const { userRoles } = require("../user")
const { createValidator, updateValidator } = require("./schemas")

const base = "/payments"

const paymentRoutes = (router, wrap) => {
  router.post(`${base}/`, wrap(auth), wrap(role(userRoles.admin)), createValidator, wrap(create))
  router.put(`${base}/:_id`, wrap(auth), wrap(role(userRoles.admin)), updateValidator, wrap(update))
  router.delete(`${base}/:_id`, wrap(auth), wrap(role(userRoles.admin)), wrap(del))
}

module.exports = {
  paymentRoutes
}
