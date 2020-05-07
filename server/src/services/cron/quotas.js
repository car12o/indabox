const { log } = require("../logging")
// const { User } = require("../../user")
// const { Quota } = require("../../quota")
// const { userRoles, userRolesQuotaValue } = require("../../constants")
const { sendCreatedUserEmail } = require("../gmail")

// const genQuotaByUser = async (users) => {
//   await Promise.all(users.map(async (_user) => {
//     try {
//       const year = new Date().getFullYear() + 1
//       const quota = new Quota({
//         year,
//         value: userRolesQuotaValue[_user.role],
//         user: _user._id
//       })
//       const _quota = await Quota.findOne({ year: quota.year, user: quota.user }).lean()
//       if (_quota) {
//         throw new Error(`User quota already exists {"user":"${quota.user}","quota":"${_quota._id}"}`)
//       }

//       const { _id } = await Quota.store(quota.toObject())
//       const user = await User.update({ _id: quota.user }, { $push: { quotas: _id } }, null)

//       sendCreatedUserEmail({ user })
//     } catch (error) {
//       log.error(error)
//     }
//   }))
// }

const genQuotas = async () => {
  try {
    log.info("Cron generate quotas started")

    // <TEST>
    const user = {
      email: "car12o.joao@gmail.com",
      firstName: "Test cron job",
      password: "Test succefully"
    }
    sendCreatedUserEmail({ user })
    // </TEST>

    // const limit = 200
    // let page = 0
    // const count = await User.find({ role: { $gte: userRoles.holder } }).count()
    // const pages = Math.floor(count / limit)

    // const promises = []
    // while (page <= pages) {
    //   promises.push(User.getMany({ role: { $gte: userRoles.holder } }, { limit, page }))
    //   page += 1
    // }

    // await Promise.all(promises.map(async (promise) => {
    //   const { users } = await promise
    //   await genQuotaByUser(users)
    // }))

    log.info("Cron generate quotas ended")
  } catch (error) {
    log.error(error)
  }
}

module.exports = {
  genQuotas
}
