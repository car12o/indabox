const mongoose = require("mongoose")

const Quota = mongoose.Schema({
  year: { type: Number, required: true },
  value: { type: Number, default: 0 },
  payment: { type: mongoose.Schema.Types.ObjectId, ref: "Payment", default: null }
}, {
  timestamps: true
})

Quota.static("findManyAndUpdate", async function findManyAndUpdate(filter, doc) {
  const quotas = await this.find(filter)
  const _quotas = quotas.map((quota) => ({ ...quota.toObject(), ...doc }))
  const quotaIds = quotas.map(({ _id }) => _id)
  await this.updateMany({ _id: { $in: quotaIds } }, { ...doc })
  return _quotas
})

module.exports = {
  Quota: mongoose.model("Quota", Quota)
}
