const mongoose = require("mongoose")
const config = require("../../config/default.json")
const { log } = require("../services/logging")
const { userRoles, userTitles, userCountries } = require("../constants")
const { hashPassword } = require("../services/crypto")
const { Payment } = require("../payment")

const _User = new mongoose.Schema({
  role: { type: Number, default: userRoles.holder },
  number: { type: Number, default: 0 },
  title: { type: String, default: userTitles.dr },
  firstName: { type: String, default: "" },
  lastName: { type: String, default: "" },
  nif: { type: String, default: "" },
  email: { type: String, default: "" },
  password: { type: String, default: () => hashPassword("123456"), select: false },
  ballotNumber: { type: String, default: "" },
  specialty: { type: String, default: "" },
  specialtySessions: { type: String, default: "" },
  newsletter: { type: Boolean, default: false },
  alerts: { type: Boolean, default: false },
  address: {
    road: { type: String, default: "" },
    postCode: { type: String, default: "" },
    city: { type: String, default: "" },
    country: { type: String, default: userCountries.pt }
  },
  phone: { type: String, default: "" },
  mobile: { type: String, default: "" },
  billing: {
    name: { type: String, default: "" },
    nif: { type: String, default: "" },
    active: { type: Boolean, default: false },
    address: {
      road: { type: String, default: "" },
      postCode: { type: String, default: "" },
      city: { type: String, default: "" },
      country: { type: String, default: "" }
    }
  },
  notes: { type: String, default: "" },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  deletedAt: { type: Date, default: null },
  deletedBy: { type: String, default: null },
  quotas: [{ type: mongoose.Schema.Types.ObjectId, ref: "Quota", default: null }]
}, {
  timestamps: true
})

const populate = [
  {
    path: "quotas",
    populate: [
      {
        path: "payment",
        populate: [
          { path: "createdBy", select: ["_id", "firstName"] },
          { path: "updatedBy", select: ["_id", "firstName"] },
          { path: "deletedBy", select: ["_id", "firstName"] }
        ]
      }
    ]
  },
  { path: "createdBy", select: ["_id", "firstName"] },
  { path: "updatedBy", select: ["_id", "firstName"] },
  { path: "deletedBy", select: ["_id", "firstName"] }
]

_User.static("get", async function get(filters, { password } = {}) {
  const user = password
    ? await this.findOne(filters).select("+password").populate(populate).lean()
    : await this.findOne(filters).populate(populate).lean()

  const payments = await Payment.getMany({ _id: { $in: user.quotas.map(({ payment }) => payment && payment._id) } })

  return { ...user, payments }
})

_User.static("getMany", async function getMany(filters) {
  const users = await this.find(filters).lean()
  return users
})

_User.static("store", async function store(doc, user) {
  if (doc.password) {
    doc.password = hashPassword(doc.password)
  }

  const _user = await this.create({
    ...doc,
    createdBy: user,
    updatedBy: user
  })

  await _user.populate(populate).execPopulate()

  return _user.toObject()
})

_User.static("update", async function update(filters, doc, user) {
  if (doc.password) {
    doc.password = hashPassword(doc.password)
  }

  const _user = await this.findOneAndUpdate(filters, {
    ...doc,
    updatedBy: user
  }, { new: true }).populate(populate)

  return _user.toObject()
})

_User.static("del", async function del(id, doc, user) {
  const _user = await this.findByIdAndUpdate(id, {
    ...doc,
    updatedBy: user,
    deletedAt: Date.now(),
    deletedBy: user
  }, { new: true })

  await _user.populate(populate).execPopulate()

  return _user.toObject()
})

const User = mongoose.model("User", _User)

const initRoot = async () => {
  const ROOT_EMAIL = process.env.ROOT_EMAIL || config.ROOT_EMAIL
  const ROOT_PASSWORD = process.env.ROOT_PASSWORD || config.ROOT_PASSWORD

  const user = await User.findOne({ email: ROOT_EMAIL })
  if (!user) {
    log.info("Mongo root user created")
    await User.create({
      firstName: "root",
      email: ROOT_EMAIL,
      password: hashPassword(ROOT_PASSWORD),
      role: userRoles.root
    })
  }
}

module.exports = {
  User,
  initRoot
}
