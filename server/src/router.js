const router = require("express").Router()
const { APIError } = require("./services/error")
const { commumRoutes } = require("./commum")
const { userRoutes } = require("./user")
const { quotaRoutes } = require("./quota")
const { paymentRoutes } = require("./payment")

const wrap = (handler) => (req, res, next) => handler(req, res, next).catch(next)

commumRoutes(router, wrap)
userRoutes(router, wrap)
quotaRoutes(router, wrap)
paymentRoutes(router, wrap)

router.use(() => {
  throw new APIError("Not Found", 404)
})

module.exports = {
  router
}
