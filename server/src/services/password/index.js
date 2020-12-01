const { connect } = require("../database/mongo")
const { User } = require("../../user/model")
const { randomPassword } = require("../../user/helpers")
const { hashPassword } = require("../crypto")
const { sendCreatedUserEmail } = require("../gmail")
const { log } = require("../logging")

const genPassword = async () => {
  const users = await User.find({ role: { $gt: 0 } })
  await Promise.all(users.map(async (user) => {
    const password = randomPassword()
    user.password = hashPassword(password)
    await user.save()
    await sendCreatedUserEmail({ user: { ...user.toJSON(), password } })
  }))
}

connect()
  .then(genPassword)
  .then(process.exit)
  .catch(log.error)
