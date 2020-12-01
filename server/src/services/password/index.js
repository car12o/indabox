/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
const { connect } = require("../database/mongo")
const { User } = require("../../user/model")
const { randomPassword } = require("../../user/helpers")
const { hashPassword } = require("../crypto")
const { sendCreatedUserEmail } = require("../gmail")
const { log } = require("../logging")

const genPassword = async () => {
  const users = await User.find({ role: { $gt: 0 } })
  for (const user of users) {
    const password = randomPassword()
    user.password = hashPassword(password)
    await user.save()
    await sendCreatedUserEmail({ user: { ...user.toJSON(), password } })
    await new Promise((res) => setTimeout(res, 100))
  }
}

connect()
  .then(genPassword)
  .then(process.exit)
  .catch(log.error)
