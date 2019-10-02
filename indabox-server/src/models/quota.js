const mongoose = require("mongoose")

const Quota = mongoose.Schema({
  year: { type: Number, required: true },
  value: { type: Number, default: 0 },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  payment: { type: mongoose.Schema.Types.ObjectId, ref: "Payment", default: null }
}, { timestamps: true })

Quota.static("belongsSameUser", (quotas) => {
  const result = quotas.reduce((accum, mbReference) => {
    const { user } = mbReference
    if (!accum[user]) {
      return { ...accum, [user]: true }
    }
    return accum
  }, {})

  return Object.keys(result).length === 1
})

Quota.static("getWithPayment", (dbQuotas) => dbQuotas.reduce((accum, quota) => {
  if (quota.payment) {
    const { _id } = quota
    accum.push(_id)
  }
  return accum
}, []))

module.exports = {
  Quota: mongoose.model("Quota", Quota, "quotas")
}
