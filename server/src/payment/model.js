const mongoose = require("mongoose")
const { paymentStatus } = require("../constants")

const Payment = mongoose.Schema({
  status: { type: Number, default: paymentStatus.unpaid },
  type: { type: String, required: true },
  value: { type: Number, required: true },
  quotasYear: [{ type: Number, required: true }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  deletedAt: { type: Date, default: null },
  deletedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  paymentDate: { type: Date, default: null },
  invoiceEmited: { type: Boolean, default: false },
  mb: {
    id: { type: Number },
    ententy: { type: String },
    subEntety: { type: String },
    reference: { type: String }
  }
}, {
  timestamps: true
})

const populate = [
  { path: "user", select: ["_id", "firstName", "lastName"] },
  { path: "createdBy", select: ["_id", "firstName"] },
  { path: "updatedBy", select: ["_id", "firstName"] },
  { path: "deletedBy", select: ["_id", "firstName"] }
]

Payment.static("get", async function get(filters) {
  const payment = await this.findOne(filters).populate(populate).lean()
  return payment
})

Payment.static("getMany", async function getMany(filters) {
  const payments = await this.find(filters).populate(populate).lean()
  return payments
})

Payment.static("store", async function store(doc, user) {
  const payment = await this.create({
    ...doc,
    createdBy: user,
    updatedBy: user
  })

  await payment.populate(populate).execPopulate()

  return payment.toObject()
})

Payment.static("update", async function update(filters, doc, user) {
  const payment = await this.findOneAndUpdate(filters, {
    ...doc,
    updatedBy: user
  }, { new: true }).populate(populate)

  return payment.toObject()
})

Payment.static("del", async function del(id, doc, user) {
  const payment = await this.findByIdAndUpdate(id, {
    ...doc,
    updatedBy: user,
    deletedAt: Date.now(),
    deletedBy: user
  }, { new: true })

  await payment.populate(populate).execPopulate()

  return payment.toObject()
})

module.exports = {
  Payment: mongoose.model("Payment", Payment)
}
