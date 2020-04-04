const { get } = require("./handlers")
const { auth, role } = require("../middleware")
const { userRoles } = require("../constants")
const { getValidator } = require("./schemas")

const base = "/quotas"

const quotaRoutes = (router, wrap) => {
  router.get(`${base}/`, wrap(auth), wrap(role(userRoles.admin)), getValidator, wrap(get))
}

module.exports = {
  quotaRoutes
}
