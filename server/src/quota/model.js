const mongoose = require("mongoose")

const Quota = mongoose.Schema({
  year: { type: Number, required: true },
  value: { type: Number, default: 0 },
  payment: { type: mongoose.Schema.Types.ObjectId, ref: "Payment", default: null }
}, {
  timestamps: true
})

module.exports = {
  Quota: mongoose.model("Quota", Quota)
}
