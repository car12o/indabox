const { log } = require("../logging")
const model = require("./model")
const { api } = require("./api")
const { template } = require("./templates")

const sendMbGeneratedEmail = async ({ user, ...payment }) => {
  try {
    if (!user.email) {
      throw new Error("Invalid user email")
    }

    const quotas = user.quotas.filter(({ year }) => payment.quotasYear.includes(year))

    const to = user.email
    const subject = "Referencia de pagamento gerada."
    const message = template.mbGenerated({ quotas, mb: { ...payment.mb, value: payment.value } })

    await api.sendEmail({ to, subject, message })
  } catch (error) {
    log.error(error)
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
    log.error(error)
  }
}

module.exports = {
  ...model,
  sendMbGeneratedEmail,
  sendMbCanceledEmail
}
