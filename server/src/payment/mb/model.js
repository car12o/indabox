const mongoose = require("mongoose")

const Mb = mongoose.Schema({
  refIds: [{ type: Number, required: true }]
}, {
  timestamps: true
})

module.exports = {
  Mb: mongoose.model("Mb", Mb)
}
