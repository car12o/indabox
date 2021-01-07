const {
  compose,
  split,
  camelCase,
  findKey,
  get,
  chunk,
  map,
  entries,
  filter,
  find,
  head
} = require("lodash/fp")
const { dirname } = require("path")
const { readdirSync, createReadStream } = require("fs")
const { createInterface } = require("readline")
const { log } = require("../../logging")
const { User } = require("../../../user")
const { Quota } = require("../../../quota")
const { Payment } = require("../../../payment")
const { userRolesText, paymentStatus, paymentTypes } = require("../../../constants")
const { connect } = require("../mongo")

const parsePayment = (rowPayment) => new Payment({
  ...rowPayment,
  status: paymentStatus.paid,
  type: paymentTypes.imported,
  quotasYear: [rowPayment.year],
  paymentDate: Date.now()
})

const parseQuotasAndPayments = (rawQuotas, user) => {
  const [iy, ...rest] = rawQuotas
  const initYear = get("initYear", iy)
  const _quotas = compose(
    filter(null),
    map(([values, { status }]) => {
      const [year, value] = entries(values).pop()
      return Number(year) >= initYear
        ? { year: Number(year), value: Number(value), status, user }
        : null
    }),
    chunk(2)
  )(rest)

  const payments = compose(
    map(parsePayment),
    filter((quota) => quota.status)
  )(_quotas)

  const quotas = _quotas.map((quota) => {
    const payment = find(({ quotasYear }) => head(quotasYear) === quota.year, payments)
    return new Quota({ ...quota, payment: payment && payment._id })
  })

  return { quotas, payments }
}

const createDeepProp = (mainKey, key) => compose(
  ([, value]) => camelCase(value),
  split(mainKey)
)(key)

const parseUser = (rawUser) => {
  const user = rawUser.reduce((acc, prop) => {
    const [key, value] = Object.entries(prop).pop()
    switch (key) {
      case "type":
        return { ...acc, role: findKey((type) => type === value, userRolesText) }
      case "address":
        return { ...acc, address: { ...acc.address, [createDeepProp("address", key)]: value } }
      case "billing":
        return { ...acc, billing: { ...acc.blling, [createDeepProp("billing", key)]: value } }
      case "termsAndConditions":
        return { ...acc, termsAndConditions: !!prop.termsAndConditions }
      case "deletedAt":
        return { ...acc, deletedAt: value ? Date.now() : null }
      default:
        return { ...acc, ...prop }
    }
  }, {})
  return new User(user)
}

let count = 0
const save = async ({ user, quotas, payments }) => {
  await User.create(user)
  await Quota.create(quotas)
  await Payment.create(payments)

  count -= 1
  if (count === 0) {
    process.exit()
  }
}

const COLUMNS = [
  "number", "title", "firstName", "lastName", "nif", "email", "ballotNumber", "specialty", "specialtySessions",
  "addressRoad", "addressCity", "addressPostCode", "addressCountry", "phone", "mobile", "termsAndConditions", "notes",
  "billingName", "billingNif", "billingRoad", "billingCity", "billingPostCode", "billingCountry", "deletedAt",
  "type", "initYear", "2014", "status", "2015", "status", "2016", "status", "2017", "status",
  "2018", "status", "2019", "status", "2020", "status", "2021", "status"
]

const seedDir = `${dirname(__dirname)}/seed`
const seedFile = readdirSync(seedDir).pop()

connect()
  .then(() => {
    log.info("Successfully connected to databases")

    const readStream = createReadStream(`${seedDir}/${seedFile}`)
    const rl = createInterface(readStream)

    rl.on("line", (line) => {
      const data = line
        .split(",")
        .map((value, i) => (COLUMNS[i] ? ({ [COLUMNS[i]]: value }) : undefined))
        .filter((value) => value !== undefined)

      if (data.length !== COLUMNS.length) {
        log.warn(`Skipping: missing data on line [${line}]`)
        return
      }

      const rawUser = data.slice(0, 25)
      const rawQuotas = data.slice(25, data.length)

      const user = parseUser(rawUser)
      const { quotas, payments } = parseQuotasAndPayments(rawQuotas, user._id)
      user.quotas = quotas.map((quota) => quota._id)
      user.payments = payments.map((payment) => payment._id)

      count += 1
      save({ user, quotas, payments })
    })
  })
  .catch((error) => log.error(error))
