const mongoose = require("mongoose")

const MbReferenceId = mongoose.Schema({
  refID: { type: Number, default: 0 },
  value: { type: Number, default: 0 },
  available: { type: [String], default: [] }
})

module.exports = {
  MbReferenceId: mongoose.model("MbReferenceId", MbReferenceId, "mbReferenceIds")
}
