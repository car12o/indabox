const mongoose = require("mongoose")
const { paymentStatus } = require("./helpers")

const Payment = mongoose.Schema({
  status: { type: Number, default: paymentStatus.unpaid },
  type: { type: String, required: true },
  value: { type: Number, required: true },
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

module.exports = {
  Payment: mongoose.model("Payment", Payment)
}
