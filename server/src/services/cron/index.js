const { job } = require("cron")
const { log } = require("../logging")
const { genQuotas } = require("./quotas")

const crons = []
const jobs = [
  // ["Generate next year quotas", "0 0 5 1 11 *", genQuotas, null, false, "Europe/Lisbon"]
  ["Generate next year quotas", "0 45 10 9 6 *", genQuotas, null, false, "Europe/Lisbon"]
]

const init = () => {
  jobs.forEach((args) => {
    const [cronName, ...cronArgs] = args
    const cron = job(...cronArgs)
    cron.start()
    crons.push(cron)

    log.info(`Cron job registered "${cronName}"`)
  })
}

const stop = () => {
  crons.forEach((cron) => {
    cron.stop()

    log.info("Cron job unregistered")
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
