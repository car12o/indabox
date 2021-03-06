const mongoose = require("mongoose")
const { compose, map, toNumber, filter, isNaN } = require("lodash/fp")
const config = require("../../config/default.json")
const { APIError } = require("../services/error")
const { log } = require("../services/logging")
const { userRoles, userTitles, userCountries } = require("../constants")
const { hashPassword } = require("../services/crypto")
const { sendCreatedUserEmail } = require("../services/email")

const _User = new mongoose.Schema({
  role: { type: Number, default: userRoles.holder },
  number: { type: Number, default: null },
  title: { type: String, default: userTitles.dr },
  firstName: { type: String, default: "" },
  lastName: { type: String, default: "" },
  nif: { type: String, default: "" },
  email: { type: String, default: "" },
  password: { type: String, default: () => hashPassword("123456"), select: false },
  ballotNumber: { type: String, default: "" },
  specialty: { type: String, default: "" },
  specialtySessions: { type: String, default: "" },
  termsAndConditions: { type: Boolean, default: false },
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
  quotas: [{ type: mongoose.Schema.Types.ObjectId, ref: "Quota", default: null }],
  payments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Payment", default: null }]
}, {
  timestamps: true
})

const regex = (term) => {
  const terms = term
    .split(" ")
    .filter((s) => s)

  const numbers = compose(
    map((n) => ({ number: n })),
    filter((n) => !isNaN(n)),
    map(toNumber)
  )(terms)

  const exp = terms.join("|")
  const regex = new RegExp(exp, "i")

  return {
    $or: [
      ...numbers,
      { firstName: regex },
      { lastName: regex },
      { nif: regex },
      { email: regex },
      { ballotNumber: regex },
      { specialty: regex },
      { specialtySessions: regex },
      { "address.road": regex },
      { "address.postCode": regex },
      { "address.city": regex },
      { "address.country": regex },
      { phone: regex },
      { mobile: regex },
      { "billing.name": regex },
      { "billing.nif": regex },
      { "billing.address.road": regex },
      { "billing.address.postCode": regex },
      { "billing.address.address": regex },
      { "billing.address.country": regex }
    ]
  }
}

const populate = [
  { path: "quotas", populate: [{ path: "payment" }] },
  {
    path: "payments",
    populate: [
      { path: "createdBy", select: ["_id", "firstName", "lastName"] },
      { path: "updatedBy", select: ["_id", "firstName", "lastName"] },
      { path: "deletedBy", select: ["_id", "firstName", "lastName"] }
    ]
  },
  { path: "createdBy", select: ["_id", "firstName", "lastName"] },
  { path: "updatedBy", select: ["_id", "firstName", "lastName"] },
  { path: "deletedBy", select: ["_id", "firstName", "lastName"] }
]

_User.static("get", async function get(filters, options = {}) {
  const user = options.password
    ? await this.findOne(filters).select("+password").populate(populate).lean()
    : await this.findOne(filters).populate(populate).lean()

  if (!user) {
    return null
  }

  return user
})

_User.static("getMany", async function getMany(
  filters,
  { search = null, sort = "number,1", limit = 1000, page = 0 } = {}
) {
  const [sortBy, order] = sort.split(",")
  const _skip = parseInt(limit * page || 0, 10)
  const _limit = parseInt(limit * page || limit, 10)
  const _filters = search ? { ...filters, ...regex(search) } : filters

  const users = await this
    .find(_filters)
    .sort({ [sortBy]: parseInt(order, 10) })
    .skip(_skip)
    .limit(_limit)
    .lean()

  const count = await this.find(_filters).count()

  return { users, count }
})

_User.static("store", async function store(doc, user) {
  const { password: pw } = doc
  const password = hashPassword(pw)

  const _user = await this.create({
    ...doc,
    password,
    createdBy: user,
    updatedBy: user
  })

  await _user.populate(populate).execPopulate()
  const u = _user.toObject()

  sendCreatedUserEmail({ user: { ...u, password: pw } })
  return u
})

_User.static("update", async function update(filters, { password, ...doc }, user) {
  if (password) {
    doc.password = hashPassword(password)
  }

  const _user = await this.findOneAndUpdate(filters, {
    ...doc,
    updatedBy: user
  }, { new: true }).populate(populate)

  if (!_user) {
    throw new APIError("User not found", 400)
  }

  return _user.toObject()
})

_User.static("del", async function del(id, doc, user) {
  const _user = await this.findByIdAndUpdate(id, {
    ...doc,
    updatedBy: user,
    deletedAt: Date.now(),
    deletedBy: user
  }, { new: true })

  if (!_user) {
    throw new APIError("User not found", 400)
  }

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
