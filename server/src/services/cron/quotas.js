/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const { log } = require("../logging")
const { User } = require("../../user")
const { Quota } = require("../../quota")
const { userRoles } = require("../../constants")
const { slack } = require("../slack")
const { generateQuota, generatePayment, getMissingPaymentQuotas, resetQuotasPayment } = require("./helpers")

const genQuotaByUser = async (users) => {
  await Promise.all(users.map(async (user) => {
    try {
      const year = new Date().getFullYear() + 1
      const quota = await generateQuota(user, year)
      const quotas = await getMissingPaymentQuotas(user._id)
      await resetQuotasPayment(quotas)
      const payment = await generatePayment(user._id, quotas)

      await User.update({ _id: user._id }, { $push: { payments: payment._id, quotas: quota._id } }, null)

      await Quota.batchUpdate(quotas.map(({ _id }) => _id), { payment: payment._id })
    } catch (error) {
      log.error(error)
      slack.send(error)
    }
  }))
}

const genQuotas = async () => {
  try {
    log.info("Cron generate next year quotas started")
    slack.send({ status: "INFO", message: "Cron generate next year quotas started" })

    const limit = 200
    const query = { role: { $gte: userRoles.holder }, deletedAt: null }
    const count = await User.find(query).count()
    const pages = Math.floor(count / limit)

    const promises = []
    let page = 0
    while (page <= pages) {
      promises.push(User.getMany(query, { limit, page }))
      page += 1
    }

    for (const promise of promises) {
      const { users } = await promise
      await genQuotaByUser(users)
      await new Promise((res) => setTimeout(res, 100))
    }

    log.info("Cron generate next year quotas ended")
    slack.send({ status: "INFO", message: "Cron generate next year quotas ended" })
  } catch (error) {
    log.error(error)
    slack.send(error)
  }
}

module.exports = {
  genQuotas
}
