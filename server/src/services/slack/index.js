const fetch = require("node-fetch")
const config = require("../../../config/default.json")

const url = process.env.SLACK_URL || config.SLACK_URL || null

const send = async (msg, { log }) => {
  if (url) {
    try {
      const res = await fetch(url, {
        headers: { "Content-type": "application/json" },
        method: "POST",
        body: JSON.stringify({ text: msg })
      })

      if (res.status !== 200) {
        log.error(res)
      }
    } catch (error) {
      log.error(error)
    }
  }
}

module.exports = {
  slack: { send }
}