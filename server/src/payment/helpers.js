const { paymentStatus, paymentTypes } = require("../constants")

const canPaymentBeCreated = (quotas, quotasId) => {
  const hasPayment = quotas.some(({ payment }) => payment !== null)
  return !hasPayment && quotas.length === quotasId.length
}

const canPaymentBeDeleted = (payment) => payment
  && payment.status === paymentStatus.unpaid
  && payment.type === paymentTypes.mb

const getDate = (dateString, addDays = 0) => {
  if (!dateString) {
    return null
  }
  const date = new Date(dateString)
  date.setDate(date.getDate() + addDays)
  return date
}

const filterByDates = ({ startDate, endDate, field }) => {
  if (!field) {
    return {}
  }

  const now = new Date()
  const yearInit = new Date(`${now.getFullYear()}-01-01`)
  return {
    [field]: {
      $gte: getDate(startDate) || yearInit,
      $lte: getDate(endDate, 1) || now
    }
  }
}

module.exports = {
  canPaymentBeCreated,
  canPaymentBeDeleted,
  filterByDates
}
