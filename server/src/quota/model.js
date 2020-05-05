const mongoose = require("mongoose")
const { APIError } = require("../services/error")
const { filterByDates } = require("../services/dates")

const Quota = mongoose.Schema({
  year: { type: Number, required: true },
  value: { type: Number, default: 0 },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  payment: { type: mongoose.Schema.Types.ObjectId, ref: "Payment", default: null }
}, {
  timestamps: true
})

const populate = [
  { path: "user", select: ["_id", "firstName", "lastName"] },
  {
    path: "payment",
    populate: [
      { path: "createdBy", select: ["_id", "firstName", "lastName"] },
      { path: "updatedBy", select: ["_id", "firstName", "lastName"] },
      { path: "deletedBy", select: ["_id", "firstName", "lastName"] }
    ]
  }
]

Quota.static("get", async function get(filters) {
  const quota = await this.findOne(filters).populate(populate).lean()
  return quota
})

Quota.static("getMany", async function getMany(
  filters,
  { dateStart, dateEnd, field, sort = "createdAt,-1", limit = 1000, page = 0 } = {}
) {
  const [sortBy, order] = sort.split(",")
  const _skip = parseInt(limit * page || 0, 10)
  const _limit = parseInt(limit * page || limit, 10)
  const _filters = { ...filters, ...filterByDates({ dateStart, dateEnd, field }) }

  const quotas = await this
    .find(_filters)
    .populate(populate)
    .sort({ [sortBy]: parseInt(order, 10) })
    .skip(_skip)
    .limit(_limit)
    .lean()

  const count = await this.find(_filters).count()

  return { quotas, count }
})

Quota.static("store", async function store(doc) {
  const quota = await this.create({ ...doc })

  await quota.populate(populate).execPopulate()

  return quota.toObject()
})

Quota.static("update", async function update(filters, doc) {
  const quota = await this.findOneAndUpdate(filters, { ...doc }, { new: true }).populate(populate)

  if (!quota) {
    throw new APIError("Payment not found", 400)
  }

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
