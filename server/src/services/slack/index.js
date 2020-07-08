const fetch = require("node-fetch")
const { log } = require("../logging")
const config = require("../../../config/default.json")

const url = process.env.SLACK_URL || config.SLACK_URL || null

const send = async ({ status, message }) => {
  if (url && ![400, 401, 404].includes(status)) {
    try {
      const res = await fetch(url, {
        headers: { "Content-type": "application/json" },
        method: "POST",
        body: JSON.stringify({
          text: `${new Date().toISOString()} | ${status || 500} | ${message || ""}`
        })
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
