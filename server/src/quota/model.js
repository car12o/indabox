const mongoose = require("mongoose")

const Quota = mongoose.Schema({
  year: { type: Number, required: true },
  value: { type: Number, default: 0 },
  payment: { type: mongoose.Schema.Types.ObjectId, ref: "Payment", default: null }
}, {
  timestamps: true
})

const populate = [
  {
    path: "payment",
    populate: [
      { path: "createdBy", select: ["_id", "firstName"] },
      { path: "updatedBy", select: ["_id", "firstName"] },
      { path: "deletedBy", select: ["_id", "firstName"] }
    ]
  }
]

Quota.static("get", async function get(filters) {
  const quota = await this.findOne(filters).populate(populate).lean()
  return quota
})

Quota.static("getMany", async function getMany(filters) {
  const quotas = await this.find(filters).lean()
  return quotas
})

Quota.static("store", async function store(doc) {
  const quota = await this.create({ ...doc })

  await quota.populate(populate).execPopulate()

  return quota.toObject()
})

Quota.static("update", async function update(filters, doc) {
  const quota = await this.findOneAndUpdate(filters, { ...doc }, { new: true }).populate(populate)

  return quota.toObject()
})

Quota.static("batchUpdate", async function batchUpdate(ids, doc) {
  await this.updateMany({ _id: { $in: ids } }, { ...doc })
  const quotas = this.find({ _id: { $in: ids } }).populate(populate).lean()
  return quotas
})

module.exports = {
  Quota: mongoose.model("Quota", Quota)
}
