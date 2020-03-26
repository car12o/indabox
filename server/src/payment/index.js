const { Payment } = require("./model")
const { paymentRoutes } = require("./routes")
const { paymentStatus, paymentTypes } = require("./helpers")

module.exports = {
  Payment,
  paymentRoutes,
  paymentStatus,
  paymentTypes
}
