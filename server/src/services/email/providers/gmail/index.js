const { log } = require("../../../logging")
const model = require("./model")
const { api } = require("./api")
const { template } = require("../../templates")
const { slack } = require("../../../slack")

const sendMbGeneratedEmail = async ({ user, quotas, ...payment }) => {
  try {
    if (!user.email) {
      throw new Error("Invalid user email")
    }

    const to = user.email
    const subject = "Referencia de pagamento gerada."
    const message = template.mbGenerated({ quotas, mb: { ...payment.mb, value: payment.value } })

    await api.sendEmail({ to, subject, message })
  } catch (error) {
    log.error("Error sending MB generated email: ", error)
    slack.send({
      status: "INFO",
      message: `Error sending MB generated email \n ${error.message}`
    })
  }
}

const sendMbCanceledEmail = async ({ user, ...payment }) => {
  try {
    if (!user.email) {
      throw new Error("Invalid user email")
    }

    const to = user.email
    const subject = "Referencia de pagamento cancelada."
    const message = template.mbCanceled({ mb: { ...payment.mb, value: payment.value } })

    await api.sendEmail({ to, subject, message })
  } catch (error) {
    log.error("Error sending MB canceled email: ", error)
    slack.send({
      status: "INFO",
      message: `Error sending MB canceled email \n ${error.message}`
    })
  }
}

const sendCreatedUserEmail = async ({ user }) => {
  try {
    if (!user.email) {
      throw new Error("Invalid user email")
    }

    const to = user.email
    const subject = "Novo utilizador."
    const message = template.userCreated({ user })

    await api.sendEmail({ to, subject, message })
  } catch (error) {
    log.error("Error sending user created email: ", error)
    slack.send({
      status: "INFO",
      message: `Error sending user created email \n ${error.message}`
    })
  }
}

module.exports = {
  ...model,
  sendMbGeneratedEmail,
  sendMbCanceledEmail,
  sendCreatedUserEmail
}
