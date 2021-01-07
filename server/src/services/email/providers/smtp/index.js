const nodemailer = require("nodemailer")
const config = require("../../../../../config/default.json")
const { log } = require("../../../logging")
const { template } = require("../../templates")
const { slack } = require("../../../slack")

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || config.SMTP_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER || config.SMTP_USER,
    pass: process.env.SMTP_PASSWORD || config.SMTP_PASSWORD
  }
})

const sendMbGeneratedEmail = async ({ user, quotas, ...payment }) => {
  try {
    if (!user.email) {
      throw new Error("Invalid user email")
    }

    const { email: to } = user
    const subject = "Referencia de pagamento gerada."
    const html = template.mbGenerated({ quotas, mb: { ...payment.mb, value: payment.value } })

    await transporter.sendMail({
      from: "noreply@coms.sppsm.org",
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
      name: ${user.firstName} \n
      userId: ${user._id} \n
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

    await transporter.sendMail({
      from: "noreply@coms.sppsm.org",
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
      name: ${user.firstName} \n
      userId: ${user._id} \n
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

    await transporter.sendMail({
      from: "noreply@coms.sppsm.org",
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
      name: ${user.firstName} \n
      userId: ${user._id} \n
      ${error.message}`
    })
  }
}

const sendUserPwChangeEmail = async ({ user }) => {
  try {
    if (!user.email) {
      throw new Error("Invalid user email")
    }

    const { email: to } = user
    const subject = "Novo utilizador."
    const html = template.userPwChange({ user })

    await transporter.sendMail({
      from: "noreply@coms.sppsm.org",
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
      name: ${user.firstName} \n
      userId: ${user._id} \n
      ${error.message}`
    })
  }
}

module.exports = {
  sendMbGeneratedEmail,
  sendMbCanceledEmail,
  sendCreatedUserEmail,
  sendUserPwChangeEmail
}
