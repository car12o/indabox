const { google } = require("googleapis")
const config = require("../../../../../config/default.json")
const { log } = require("../../../logging")
const { Token } = require("./model")

const gmail = google.gmail({ version: "v1" })
const userId = process.env.GMAIL_USER_ID || config.GMAIL_USER_ID
let auth = null

const getAuth = async () => {
  if (!auth) {
    const token = await Token.get()
    auth = new google.auth.OAuth2({
      clientId: process.env.GMAIL_CLIENT_ID || config.GMAIL_CLIENT_ID,
      clientSecret: process.env.GMAIL_CLIENT_SECRET || config.GMAIL_CLIENT_SECRET
    })
    auth.setCredentials(token)
  }

  return auth
}

const sendEmail = async ({ to, subject, message }) => {
  const body = [
    `To: ${to}`,
    "MIME-Version: 1.0",
    "Content-Type: text/html; charset=utf-8",
    `Subject: ${subject}`,
    "",
    `${message}`
  ].join("\n")

  const requestBody = {
    raw: Buffer.from(body)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "")
  }

  const auth = await getAuth()
  const { status, data } = await gmail.users.messages.send({ auth, userId, requestBody })
  log.info("Email sent with success", { res: { status, to, data } })
  return data
}

module.exports = {
  api: {
    sendEmail
  }
}
