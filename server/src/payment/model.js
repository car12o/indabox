const mongoose = require("mongoose")
const { APIError } = require("../services/error")
const { paymentStatus, paymentTypes } = require("../constants")
const { sendMbGeneratedEmail, sendMbCanceledEmail } = require("../services/gmail")

const Payment = mongoose.Schema({
  status: { type: Number, default: paymentStatus.unpaid },
  type: { type: String, required: true },
  value: { type: Number, required: true },
  quotasYear: [{ type: Number, required: true }],
  paymentDate: { type: Date, default: null },
  invoiceEmited: { type: Boolean, default: false },
  mb: {
    id: { type: Number },
    ententy: { type: String },
    subEntety: { type: String },
    reference: { type: String },
    terminal: { type: String }
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  deletedAt: { type: Date, default: null },
  deletedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null }
}, {
  timestamps: true
})

const populate = [
  { path: "user", select: ["_id", "firstName", "lastName"] },
  { path: "createdBy", select: ["_id", "firstName", "lastName"] },
  { path: "updatedBy", select: ["_id", "firstName", "lastName"] },
  { path: "deletedBy", select: ["_id", "firstName", "lastName"] }
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

  await payment.populate([
    { path: "user", populate: [{ path: "quotas" }] },
    { path: "createdBy", select: ["_id", "firstName"] },
    { path: "updatedBy", select: ["_id", "firstName"] },
    { path: "deletedBy", select: ["_id", "firstName"] }
  ]).execPopulate()
  const _payment = payment.toObject()

  if (_payment.type === paymentTypes.mb) {
    sendMbGeneratedEmail(_payment)
  }

  return {
    ..._payment,
    user: {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName
    }
  }
})

Payment.static("update", async function update(filters, doc, user) {
  const payment = await this.findOneAndUpdate(filters, {
    ...doc,
    updatedBy: user
  }, { new: true }).populate(populate)

  if (!payment) {
    throw new APIError("Payment not found", 400)
  }

  return payment.toObject()
})

Payment.static("del", async function del(id, doc, user) {
  const { mb } = await this.findById(id).lean()
  const payment = await this.findByIdAndUpdate(id, {
    ...doc,
    updatedBy: user,
    deletedAt: Date.now(),
    deletedBy: user
  }, { new: true })

  if (!payment) {
    throw new APIError("Payment not found", 400)
  }

  await payment.populate([
    { path: "user", populate: [{ path: "quotas" }] },
    { path: "createdBy", select: ["_id", "firstName"] },
    { path: "updatedBy", select: ["_id", "firstName"] },
    { path: "deletedBy", select: ["_id", "firstName"] }
  ]).execPopulate()
  const _payment = payment.toObject()

  if (_payment.type === paymentTypes.mb) {
    sendMbCanceledEmail({ ..._payment, mb })
  }

  return {
    ..._payment,
    user: {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName
    }
  }
})

module.exports = {
  Payment: mongoose.model("Payment", Payment)
}
