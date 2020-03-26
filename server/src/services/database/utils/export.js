// const fs = require("fs")
// const os = require("os")
// const { mongo } = require("./database")
// const { User } = require("../../models/user")
// require("../../models/quota")
// const config = require("../../../config/default.json")
// const logger = require("../logging")

// log = logger

// const stringify = (user) => {
//   const _user = `${user.number},`
//     + `${user.title},`
//     + `${user.firstName},`
//     + `${user.lastName},`
//     + `${user.nif},`
//     + `${user.email},`
//     + `${user.ballotNumber},`
//     + `${user.specialty},`
//     + `${user.specialtySessions},`
//     + `${user.address.road},`
//     + `${user.address.postCode},`
//     + `${user.address.city},`
//     + `${user.address.country},`
//     + `${user.phone},`
//     + `${user.mobile},`
//     + `${user.newsletter ? "s" : "n"},`
//     + `${user.alerts ? "s" : "n"},`
//     + `${user.notes},`
//     + `${user.billing.name},`
//     + `${user.billing.nif},`
//     + `${user.billing.address.road},`
//     + `${user.billing.address.postCode},`
//     + `${user.billing.address.city},`
//     + `${user.billing.address.country}`
//   return user.quotas.reduce((acc, quota, i) => {
//     if (i === 2) {
//       return `${acc},0,n,${quota.value},n`
//     }
//     return `${acc},${quota.value},n`
//   }, _user)
// }

// const getData = () => User.find().select("-password").populate([
//   { path: "quotas", select: "-user" }
// ])

// const writeData = (out, data) => data.forEach((user) => {
//   fs.appendFileSync(out, stringify(user) + os.EOL)
// });

// (async () => {
//   try {
//     const arg = process.argv.find((elem) => elem.includes("out="))
//     if (!arg) {
//       throw new Error("Invalid path. try [npm run export -- out={out}]")
//     }
//     // eslint-disable-next-line no-unused-vars
//     const [_, out] = arg.split("=")

//     await mongo.connect(config)

//     log.info("Reading data from mongo ...")
//     const data = await getData()

//     log.info("writing data ...")
//     writeData(out, data)
//   } catch (error) {
//     log.error(error)
//   }

//   process.exit()
// })()
