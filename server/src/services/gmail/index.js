const { log } = require("../logging")
const model = require("./model")
const { api } = require("./api")
const { template } = require("./templates")

const TEST_EMAIL = "car12o.joao@gmail.com"

const sendMbGeneratedEmail = async ({ user, ...payment }) => {
  try {
    if (!user.email) {
      throw new Error("Invalid user email")
    }

    const quotas = user.quotas.filter(({ year }) => payment.quotasYear.includes(year))

    // const to = user.emailcons
    const to = TEST_EMAIL
    const subject = "Referencia de pagamento gerada."
    const message = template.mbGenerated({ quotas, mb: { ...payment.mb, value: payment.value } })

    await api.sendEmail({ to, subject, message })
  } catch (error) {
    log.error("Error sending MB generated email: ", error)
  }
}

const sendMbCanceledEmail = async ({ user, ...payment }) => {
  try {
    if (!user.email) {
      throw new Error("Invalid user email")
    }

    // const to = user.email
    const to = TEST_EMAIL
    const subject = "Referencia de pagamento cancelada."
    const message = template.mbCanceled({ mb: { ...payment.mb, value: payment.value } })

    await api.sendEmail({ to, subject, message })
  } catch (error) {
    log.error("Error sending MB canceled email: ", error)
  }
}

const sendCreatedUserEmail = async ({ user }) => {
  try {
    if (!user.email) {
      throw new Error("Invalid user email")
    }

    // const to = user.email
    const to = TEST_EMAIL
    const subject = "Novo utilizador."
    const message = template.userCreated({ user })

    await api.sendEmail({ to, subject, message })
  } catch (error) {
    log.error("Error sending user created email: ", error)
  }
}

module.exports = {
  ...model,
  sendMbGeneratedEmail,
  sendMbCanceledEmail,
  sendCreatedUserEmail
}
