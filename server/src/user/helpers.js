const { Quota } = require("../quota")
const { userRoles } = require("../constants")

const randomPassword = () => Math.random().toString(36).substring(2)

const genQuota = async (user) => {
  const now = new Date()
  const month = now.getMonth()
  const year = now.getFullYear()

  const quota = await Quota.store({
    year: month === 11 ? year + 1 : year,
    value: user.role === userRoles.holder ? 60 : 30,
    user: user._id
  })

  return quota
}

module.exports = {
  randomPassword,
  genQuota
}
