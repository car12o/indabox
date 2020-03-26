const { create, del } = require("./handlers")
const { auth, role } = require("../middleware")
const { userRoles } = require("../user")
const { createValidator } = require("./schemas")

const base = "/payments"

const paymentRoutes = (router, wrap) => {
  router.post(`${base}/`, wrap(auth), wrap(role(userRoles.admin)), createValidator, wrap(create))
  router.delete(`${base}/:id`, wrap(auth), wrap(role(userRoles.admin)), wrap(del))
}

module.exports = {
  paymentRoutes
}
