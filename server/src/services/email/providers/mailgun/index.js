const Mailgun = require("mailgun-js")
const config = require("../../../../../config/default.json")
const { log } = require("../../../logging")
const { template } = require("../../templates")
const { slack } = require("../../../slack")

const mailgun = Mailgun({
  apiKey: process.env.MAILGUN_KEY || config.MAILGUN_KEY,
  domain: process.env.MAILGUN_DOMAIN || config.MAILGUN_DOMAIN,
  host: process.env.MAILGUN_HOST || config.MAILGUN_HOST
})

const sendMbGeneratedEmail = async ({ user, quotas, ...payment }) => {
  try {
    if (!user.email) {
      throw new Error("Invalid user email")
    }

    const { email: to } = user
    const subject = "Referencia de pagamento gerada."
    const html = template.mbGenerated({ quotas, mb: { ...payment.mb, value: payment.value } })

    await mailgun.messages().send({
      from: "associados@sppsm.org",
      to,
      subject,
      html
    })
  } catch (error) {
    log.error("Error sending MB generated email: ", error)
    slack.send({
      status: "INFO",
      message: `Error sending MB generated email \n
      emai: ${user.email} \n
      ${error.message}`
    })
  }
}

const sendMbCanceledEmail = async ({ user, ...payment }) => {
  try {
    if (!user.email) {
      throw new Error("Invalid user email")
    }

    const { email: to } = user
    const subject = "Referencia de pagamento cancelada."
    const html = template.mbCanceled({ mb: { ...payment.mb, value: payment.value } })

    await mailgun.messages().send({
      from: "associados@sppsm.org",
      to,
      subject,
      html
    })
  } catch (error) {
    log.error("Error sending MB canceled email: ", error)
    slack.send({
      status: "INFO",
      message: `Error sending MB canceled email \n
      emai: ${user.email} \n
      ${error.message}`
    })
  }
}

const sendCreatedUserEmail = async ({ user }) => {
  try {
    if (!user.email) {
      throw new Error("Invalid user email")
    }

    const { email: to } = user
    const subject = "Novo utilizador."
    const html = template.userCreated({ user })

    await mailgun.messages().send({
      from: "associados@sppsm.org",
      to,
      subject,
      html
    })
  } catch (error) {
    log.error("Error sending user created email: ", error)
    slack.send({
      status: "INFO",
      message: `Error sending user created email \n
      emai: ${user.email} \n
      ${error.message}`
    })
  }
}

module.exports = {
  sendMbGeneratedEmail,
  sendMbCanceledEmail,
  sendCreatedUserEmail
}
