const { log } = require("../logging")
const { User } = require("../../user")
const { Quota } = require("../../quota")
// const { userRoles } = require("../../constants")
const { slack } = require("../slack")
const { generatePayment, getMissingPaymentQuotas, resetQuotasPayment } = require("./helpers")

const genQuotaByUser = async (users) => {
  await Promise.all(users.map(async (user) => {
    try {
      // const year = new Date().getFullYear() + 1
      // const quota = await generateQuota(user, year)
      const quotas = await getMissingPaymentQuotas(user._id)
      await resetQuotasPayment(quotas)
      const payment = await generatePayment(user._id, quotas)

      // await User.update({ _id: user._id }, { $push: { payments: payment._id, quotas: quota._id } }, null)
      await User.update({ _id: user._id }, { $push: { payments: payment._id } }, null)

      await Quota.batchUpdate(quotas.map(({ _id }) => _id), { payment: payment._id })
    } catch (error) {
      log.error(error)
      slack.send(error)
    }
  }))
}

const genQuotas = async () => {
  try {
    log.info("Cron generate next year quotas")
    slack.send({ status: "INFO", message: "Cron generate next year quotas" })

    // const limit = 200
    // const query = { role: { $gte: userRoles.holder }, deletedAt: null }
    // const count = await User.find(query).count()
    // const pages = Math.floor(count / limit)

    // const promises = []
    // let page = 0
    // while (page <= pages) {
    //   promises.push(User.getMany(query, { limit, page }))
    //   page += 1
    // }

    // await Promise.all(promises.map(async (promise) => {
    //   const { users } = await promise
    //   await genQuotaByUser(users)
    // }))

    const users = await User.find({
      email: {
        $in: [
          "mjhsantos@netcabo.pt",
          "luismadeiramd@gmail.com",
          "joaobessa@med.uminho.pt",
          "jemt01@gmail.com",
          "emacondesantos@gmail.com",
          "joaoluis19@hotmail.com",
          "jcerejeira@netcabo.pt",
          "manuelanevesabreu@gmail.com",
          "ricardomcoentre@gmail.com"
        ]
      }
    }).populate().lean()

    await genQuotaByUser(users)

    log.info("Cron generate next year ended")
    slack.send({ status: "INFO", message: "Cron generate next year ended" })
  } catch (error) {
    log.error(error)
    slack.send(error)
  }
}

module.exports = {
  genQuotas
}
