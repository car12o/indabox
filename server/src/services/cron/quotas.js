const { compose, filter, map, uniqBy } = require("lodash/fp")
const { log } = require("../logging")
const { User } = require("../../user")
const { Quota } = require("../../quota")
const { Payment } = require("../../payment")
const { createMb, deleteMb } = require("../../payment/mb")
const { userRoles, userRolesQuotaValue, paymentStatus, paymentTypes } = require("../../constants")
const { slack } = require("../slack")

const generateNewQuota = async (user) => {
  const year = new Date().getFullYear() + 1
  const quota = new Quota({
    year,
    value: userRolesQuotaValue[user.role],
    user: user._id
  })
  const _quota = await Quota.findOne({ user: quota.user, year }).lean()
  if (_quota) {
    throw new Error(`User quota already exists {"user":"${quota.user}","quota":"${_quota._id}"}`)
  }

  const $quota = await Quota.store(quota.toObject())
  return $quota
}

const resetQuotasPayment = async (_quotas) => {
  const quotas = compose(
    uniqBy("_id"),
    map(({ payment }) => payment),
    filter(({ payment }) => payment)
  )(_quotas)

  await Promise.all(quotas.map(async (payment) => {
    await deleteMb(payment.mb.id)
    await Payment.del({ _id: payment._id }, {
      status: paymentStatus.canceled,
      mb: null
    }, null)
  }))

  await Quota.batchUpdate(quotas.map(({ _id }) => _id), { payment: null })
}

const generatePayment = async (_quotas) => {
  const { value, quotasYear } = _quotas.reduce((acc, { year, value }) => ({
    value: acc.value + value,
    quotasYear: [...acc.quotasYear, year]
  }), { value: 0, quotasYear: [] })

  const payment = new Payment({
    value,
    type: paymentTypes.mb,
    quotasYear: quotasYear.sort((a, b) => b - a),
    user: _quotas[0].user
  })

  if (payment.type === paymentTypes.mb) {
    payment.mb = await createMb(payment.value)
  } else {
    payment.status = paymentStatus.paid
    payment.paymentDate = Date.now()
  }

  const _payment = await Payment.store(payment.toObject(), null)
  return _payment
}

const genQuotaByUser = async (users) => {
  await Promise.all(users.map(async (_user) => {
    try {
      const quota = await generateNewQuota(_user)

      const { quotas: _quotas } = await Quota.getMany({ user: _user._id })
      const quotas = _quotas.filter(({ payment }) => !payment || !payment.paymentDate)
      await resetQuotasPayment(quotas)
      const payment = await generatePayment(quotas)

      await User.update({ _id: payment.user._id }, { $push: { payments: payment._id, quotas: quota._id } }, null)
      await Quota.batchUpdate(quotas.map(({ _id }) => _id), { payment: payment._id })
    } catch (error) {
      log.error(error)
      slack.send(error, { log })
    }
  }))
}

const genQuotas = async () => {
  try {
    log.info("Cron generate quotas started")
    slack.send({ status: "INFO", message: "Cron generate quotas started" }, { log })

    const limit = 200
    let page = 0
    const query = { role: { $gte: userRoles.holder }, deletedAt: null }
    const count = await User.find(query).count()
    const pages = Math.floor(count / limit)

    const promises = []
    while (page <= pages) {
      promises.push(User.getMany(query, { limit, page }))
      page += 1
    }

    await Promise.all(promises.map(async (promise) => {
      const { users } = await promise
      await genQuotaByUser(users)
    }))

    log.info("Cron generate quotas ended")
    slack.send({ status: "INFO", message: "Cron generate quotas ended" }, { log })
  } catch (error) {
    log.error(error)
    slack.send(error, { log })
  }
}

module.exports = {
  genQuotas
}
