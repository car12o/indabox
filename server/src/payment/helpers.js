const { paymentStatus, paymentTypes } = require("../constants")

const canPaymentBeCreated = (quotas, quotasId) => {
  const hasPayment = quotas.some(({ payment }) => payment !== null)
  return !hasPayment && quotas.length === quotasId.length
}

const canPaymentBeDeleted = (payment) => payment
  && payment.status === paymentStatus.unpaid
  && payment.type === paymentTypes.mb

module.exports = {
  canPaymentBeCreated,
  canPaymentBeDeleted
}
