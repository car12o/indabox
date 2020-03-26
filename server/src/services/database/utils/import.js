// /* eslint-disable no-unused-vars */
// const fs = require("fs")
// const readline = require("readline")
// const { Types } = require("mongoose")
// const { mongo } = require("./database")
// const { User } = require("../../models/user")
// const { Quota } = require("../../models/quota")
// const { Payment, paymentStatus, paymentTypes } = require("../../models/payment")
// const config = require("../../../config/default.json")
// const logger = require("../logging")

// log = logger

// const parseLine = (line) => {
//   const [
//     number,
//     title,
//     firstName,
//     lastName,
//     nif,
//     email,
//     ballotNumber,
//     specialty,
//     specialtySessions,
//     addressRoad,
//     addressCity,
//     addressPostCode,
//     addressCountry,
//     phone,
//     mobile,
//     newsletter,
//     alerts,
//     notes,
//     billingName,
//     billingNif,
//     billingAddressRoad,
//     billingAddressCity,
//     billingAddressPostCode,
//     billingAddressCountry,
//     _,
//     _1,
//     _2,
//     _3,
//     _4,
//     _5,
//     _6,
//     quota2014,
//     payment2014,
//     quota2015,
//     payment2015,
//     quota2016,
//     payment2016,
//     quota2017,
//     payment2017,
//     quota2018,
//     payment2018,
//     quota2019,
//     payment2019,
//     quota2020,
//     payment2020
//   ] = line.split(",")

//   const user = {
//     number,
//     title,
//     firstName,
//     lastName,
//     nif,
//     email,
//     ballotNumber,
//     specialty,
//     specialtySessions,
//     address: {
//       road: addressRoad,
//       postCode: addressPostCode,
//       city: addressCity,
//       country: addressCountry
//     },
//     phone,
//     mobile,
//     newsletter: newsletter === "s",
//     alerts: alerts === "s",
//     notes,
//     billing: {
//       name: billingName,
//       nif: billingNif,
//       road: billingAddressRoad,
//       postCode: billingAddressPostCode,
//       city: billingAddressCity,
//       country: billingAddressCountry
//     },
//     quotas: [],
//     payments: []
//   }

//   const quotas = [
//     { year: 2014, value: quota2014, payment: payment2014 },
//     { year: 2015, value: quota2015, payment: payment2015 },
//     { year: 2016, value: quota2016, payment: payment2016 },
//     { year: 2017, value: quota2017, payment: payment2017 },
//     { year: 2018, value: quota2018, payment: payment2018 },
//     { year: 2019, value: quota2019, payment: payment2019 },
//     { year: 2020, value: quota2020, payment: payment2020 }
//   ]

//   return { user, quotas }
// }

// const buildData = (line) => {
//   const { user, quotas } = parseLine(line)
//   const _user = new User({ ...user, id: Types.ObjectId() })
//   const { _quotas, _payments } = quotas.reduce((acc, quota) => {
//     const _quota = new Quota({
//       id: Types.ObjectId(),
//       year: quota.year,
//       value: quota.value,
//       user: _user.id
//     })

//     if (quota.payment && quota.payment.toLocaleLowerCase === "s") {
//       const _payment = new Payment({
//         id: Types.ObjectId(),
//         type: paymentTypes.imported,
//         value: quota.value,
//         status: {
//           label: paymentStatus.paid.label,
//           value: paymentStatus.paid.value
//         },
//         paymentDate: Date.now(),
//         user: _user.id,
//         quotas: [_quota.id]
//       })

//       acc._payments.push(_payment)
//       _user.payments.push(_payment.id)
//       _quota.payment = _payment.id
//     }

//     acc._quotas.push(_quota)
//     _user.quotas.push(_quota.id)
//     return acc
//   }, { _quotas: [], _payments: [] })

//   return { user: _user, quotas: _quotas, payments: _payments }
// }

// const writeData = async (users) => {
//   await Promise.all(users.map(({ user, quotas, payments }) => Promise.all([
//     user.save(),
//     ...quotas.map((quota) => quota.save()),
//     ...payments.map((payment) => payment.save())
//   ])))
// }

// (async () => {
//   try {
//     const arg = process.argv.find((elem) => elem.includes("path="))
//     if (!arg) {
//       throw new Error("Invalid path. try [npm run import -- path={path}]")
//     }

//     const [_, path] = arg.split("=")

//     await mongo.connect(config)

//     const rl = readline.createInterface({
//       input: fs.createReadStream(path)
//     })

//     const data = []
//     rl.on("line", (line) => {
//       rl.pause()
//       const user = buildData(line)
//       data.push(user)
//       rl.resume()
//     }).on("close", async () => {
//       await writeData(data)
//       log.info("Import finished")
//       process.exit()
//     })
//   } catch (error) {
//     log.error(error)
//   }
// })()
