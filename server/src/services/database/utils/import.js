const { compose, split, camelCase, chunk, map, toNumber, filter } = require("lodash/fp")
const { dirname } = require("path")
const { readdirSync, createReadStream } = require("fs")
const { createInterface } = require("readline")
const { log } = require("../../logging")
const { User } = require("../../../user")
const { Quota } = require("../../../quota")
const { Payment } = require("../../../payment")
const { paymentStatus, paymentTypes } = require("../../../constants")
const { connect } = require("../mongo")

const getPayment = (qStatus, { user, value, year }) => {
  const status = Object.values(qStatus).pop()
  if (status) {
    return new Payment({
      status: paymentStatus.paid,
      type: paymentTypes.imported,
      paymentDate: Date.now(),
      quotasYear: [year],
      user,
      value
    })
  }
  return null
}

const getQuotas = (rawQuotas, user) => {
  let quotas = compose(
    map(([qYear, qStatus]) => {
      const [values] = Object.entries(qYear)
      const year = values[0].split("quota")[1]
      const value = values[1] || 0
      const payment = getPayment(qStatus, { user, value, year })
      return { user, year, value: toNumber(value), payment }
    }),
    chunk(2)
  )(rawQuotas)

  const payments = compose(
    filter(undefined),
    map(({ payment }) => payment)
  )(quotas)

  quotas = quotas.map((quota) => new Quota({ ...quota, payment: quota.payment ? quota.payment._id : null }))
  return { quotas, payments }
}

const createProp = (mainKey, key) => compose(
  (arr) => camelCase(arr[1]),
  split(mainKey)
)(key)

const getUser = (rawUser) => {
  const user = rawUser.reduce((acc, v) => {
    const [values] = Object.entries(v)
    const key = values[0]
    const value = values[1]

    if (key.includes("address")) {
      const prop = createProp("address", key)
      return { ...acc, address: { ...acc.address, [prop]: value } }
    }

    if (key.includes("billing")) {
      const prop = createProp("billing", key)
      return { ...acc, billing: { ...acc.billing, [prop]: value } }
    }

    return { ...acc, [key]: value }
  }, {})

  user.newsletter = !!user.newsletter || false
  user.alerts = !!user.alerts || false
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
  "addressRoad", "addressCity", "addressPostCode", "addressCountry", "phone", "mobile", "newsletter", "alerts",
  "notes", "billingName", "billingNif", "billingRoad", "billingCity", "billingPostCode", "billingCountry", "quota2010",
  "quota2010status", "quota2011", "quota2011status", "quota2012", "quota2012status", "quota2013", "quota2013status",
  "quota2014", "quota2014status", "quota2015", "quota2015status", "quota2016", "quota2016status", "quota2017",
  "quota2017status", "quota2018", "quota2018status", "quota2019", "quota2019status", "quota2020", "quota2020status"
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

      const rawQuotas = data.slice(24, data.length)
      const rawUser = data.slice(0, 23)

      const user = getUser(rawUser)
      const { quotas, payments } = getQuotas(rawQuotas, user._id)
      user.quotas = quotas.map(({ _id }) => _id)

      count += 1
      save({ user, quotas, payments })
    })
  })
  .catch((error) => log.error(error))
