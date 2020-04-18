const mongoose = require("mongoose")

const Token = mongoose.Schema({
  access_token: { type: String, required: true },
  refresh_token: { type: String, required: true },
  scope: { type: String, required: true },
  token_type: { type: String, required: true },
  expiry_date: { type: Number, required: true }
}, {
  timestamps: true
})

Token.static("get", function get(filters) {
  return this.findOne(filters).lean()
})

Token.static("store", async function store(doc) {
  const token = await this.create(doc)
  return token.toObject()
})

module.exports = {
  Token: mongoose.model("Token", Token)
}
