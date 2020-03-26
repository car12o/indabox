const mongoose = require("mongoose")
const config = require("../../../config/default.json")
const { log } = require("../logging")

const connect = async (tries = 1) => {
  const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || config.MONGO_CONNECTION_STRING

  try {
    log.info(`Connect to mongo try: ${tries}`)
    await mongoose.connect(MONGO_CONNECTION_STRING, {
      useNewUrlParser: true,
      keepAlive: true,
      keepAliveInitialDelay: 300000
    })

    return null
  } catch (error) {
    if (tries === 5) {
      throw error
    }

    await new Promise((resolve) => setTimeout(resolve, 2000))
    return connect(tries + 1)
  }
}

module.exports = {
  connect
}
