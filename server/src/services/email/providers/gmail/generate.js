const readline = require("readline")
const { google } = require("googleapis")
const config = require("../../../../../config/default.json")
const { log } = require("../../../logging")
const { mongo } = require("../../../database")
const { Token } = require("./model")

const oAuth2 = new google.auth.OAuth2({
  clientId: process.env.GMAIL_CLIENT_ID || config.GMAIL_CLIENT_ID,
  clientSecret: process.env.GMAIL_CLIENT_SECRET || config.GMAIL_CLIENT_SECRET,
  redirectUri: ["urn:ietf:wg:oauth:2.0:oob"]
})

const storeToken = async (token) => {
  await mongo.connect()
  await Token.deleteMany()
  await Token.store(token)
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.write("-> Auth URL \n")
const url = oAuth2.generateAuthUrl({
  access_type: "offline",
  scope: [
    "https://www.googleapis.com/auth/gmail.readonly",
    "https://www.googleapis.com/auth/gmail.send"
  ]
})
rl.write(`${url} \n\n`)

rl.question(`-> Code
> `, async (code) => {
  try {
    const { res: { data } } = await oAuth2.getToken(code)
    await storeToken(data)
    rl.write("Token stored successfully \n")
  } catch (error) {
    log.error(error)
  }

  process.exit()
})
