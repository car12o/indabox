/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
const { connect } = require("../database/mongo")
const { userRoles } = require("../../constants")
const { User } = require("../../user/model")
const { Quota } = require("../../quota/model")
const { log } = require("../logging")
const { getMissingPaymentQuotas, resetQuotasPayment, generatePayment } = require("./helpers")

const genMbRefs = async () => {
  const users = await User.find({ role: { $gte: userRoles.holder } })
  for (const user of users) {
    const quotas = await getMissingPaymentQuotas(user._id)
    await resetQuotasPayment(quotas)
    const payment = await generatePayment(user._id, quotas)

    await User.update({ _id: user._id }, { $push: { payments: payment._id } }, null)

    await Quota.batchUpdate(quotas.map(({ _id }) => _id), { payment: payment._id })
    await new Promise((res) => setTimeout(res, 2000))
  }
}

connect()
  .then(genMbRefs)
  .then(process.exit)
  .catch(log.error)
