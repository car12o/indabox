const { Quota } = require("../quota")
const { Payment } = require("../payment")
const { createMb } = require("../payment/mb")
const { userRoles, paymentTypes } = require("../constants")

const randomPassword = () => Math.random().toString(36).substring(2)

const genQuota = async (user) => {
  const now = new Date()
  const month = now.getMonth()
  const year = now.getFullYear()

  const quota = new Quota({
    year: month === 11 ? year + 1 : year,
    value: user.role === userRoles.holder ? 60 : 30,
    user: user._id
  })

  const payment = await Payment.store({
    value: quota.value,
    type: paymentTypes.mb,
    mb: await createMb(quota.value),
    quotasYear: [quota.year],
    user: user._id
  })

  const _quota = await Quota.store({ ...quota.toObject(), payment: payment._id })

  return { quota, _quota, payment }
}

module.exports = {
  randomPassword,
  genQuota
}
