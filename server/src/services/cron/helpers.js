const { Quota } = require("../../quota")
const { Payment } = require("../../payment")
const { createMb, deleteMb } = require("../../payment/mb")
const { userRolesQuotaValue, paymentStatus, paymentTypes } = require("../../constants")

const generateQuota = async (user, year) => {
  const quota = new Quota({
    year,
    value: userRolesQuotaValue[user.role],
    user: user._id
  })
  const _quota = await Quota.findOne({ user: quota.user, year: quota.year }).lean()
  if (_quota) {
    throw new Error(`User quota already exists {"user":"${quota.user}","quota":"${_quota._id}"}`)
  }

  const $quota = await Quota.store(quota.toObject())
  return $quota
}

const getMissingPaymentQuotas = async (userID) => {
  const { quotas } = await Quota.getMany({ user: userID })
  const _quotas = quotas.filter(({ payment }) => !payment || !payment.paymentDate)
  return _quotas
}

const resetQuotasPayment = async (quotas) => {
  await Promise.all(quotas.map(async ({ payment }) => {
    if (payment) {
      await deleteMb(payment.mb.id)
      await Payment.del({ _id: payment._id }, {
        status: paymentStatus.canceled,
        mb: null
      }, null)
    }
  }))

  await Quota.batchUpdate(quotas.map(({ _id }) => _id), { payment: null })
}

const generatePayment = async (userID, quotas) => {
  const { value, quotasYear } = quotas.reduce((acc, { year, value }) => ({
    value: acc.value + value,
    quotasYear: [...acc.quotasYear, year]
  }), { value: 0, quotasYear: [] })

  const payment = new Payment({
    value,
    type: paymentTypes.mb,
    mb: await createMb(value),
    quotasYear: quotasYear.sort((a, b) => b - a),
    user: userID
  })

  const _payment = await Payment.store(payment.toObject())
  return _payment
}

module.exports = {
  generateQuota,
  getMissingPaymentQuotas,
  resetQuotasPayment,
  generatePayment
}
