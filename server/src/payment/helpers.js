const paymentStatus = {
  paid: 0,
  unpaid: 10,
  canceled: 20
}

const paymentTypes = {
  imported: "Importado",
  manual: "Manual",
  mb: "Referencia MB"
}

const canPaymentBeCreated = (quotas, quotasId) => {
  const hasPayment = quotas.some(({ payment }) => payment !== null)
  return !hasPayment && quotas.length === quotasId.length
}

const canPaymentBeDeleted = (payment) => payment
  && payment.status === paymentStatus.unpaid
  && payment.type === paymentTypes.mb

module.exports = {
  paymentStatus,
  paymentTypes,
  canPaymentBeCreated,
  canPaymentBeDeleted
}
