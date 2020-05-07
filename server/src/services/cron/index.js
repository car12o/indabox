const { job } = require("cron")
const { log } = require("../logging")
const { genQuotas } = require("./quotas")

const crons = []
const jobs = [
  ["0 0 10 8 4 *", genQuotas, null, false, "Europe/Lisbon"]
]

const init = () => {
  jobs.forEach((args) => {
    const cron = job(...args)
    cron.start()
    crons.push(cron)
  })
}

const stop = () => {
  crons.forEach((cron) => {
    cron.stop()
  })
}

const lastDate = () => {
  crons.forEach((cron) => {
    const date = cron.lastDate()
    log.info(date)
  })
}

module.exports = {
  cron: {
    init,
    stop,
    lastDate
  }
}
