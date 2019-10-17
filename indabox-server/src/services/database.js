/* eslint-disable no-await-in-loop */
const mongoose = require("mongoose")
const redis = require("redis")
const { promisify } = require("util")
const { User, userRoles } = require("../models/user")
const { hashPassword } = require("../services/crypto")

module.exports = {
  mongo: {
    connect: async function connect(config) {
      const MONGO_HOST = process.env.MONGO_HOST || config.MONGO_HOST
      const MONGO_USER = process.env.MONGO_USER || config.MONGO_USER
      const MONGO_PASSWORD = process.env.MONGO_PASSWORD || config.MONGO_PASSWORD

      const connectionString = MONGO_HOST
        .replace("{MONGO_USER}", MONGO_USER)
        .replace("{MONGO_PASSWORD}", MONGO_PASSWORD)

      let connected = false
      let tries = 0
      while (!connected) {
        try {
          log.info(`Trying to connect to mongo: ${tries}`)
          await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useCreateIndex: true,
            socketTimeoutMS: 0,
            keepAlive: true,
            reconnectTries: 30,
            useUnifiedTopology: true
          })

          connected = true
        } catch (error) {
          log.error(error)
          if (tries === 5) {
            throw error
          }

          tries += 1
          await new Promise((resolve) => setTimeout(resolve, 2000))
        }
      }

      const ROOT_EMAIL = process.env.ROOT_EMAIL || config.ROOT_EMAIL
      const ROOT_PASSWORD = process.env.ROOT_PASSWORD || config.ROOT_PASSWORD

      const hasAdmin = await this.hasAdmin(ROOT_EMAIL)
      if (!hasAdmin) {
        this.createAdmin(ROOT_EMAIL, ROOT_PASSWORD)
        log.info("Created admin user")
      }
    },
    hasAdmin: (email) => User.findOne({ email }),
    createAdmin: (email, password) => User.create({
      email,
      password: hashPassword(password),
      role: {
        label: userRoles.root.label,
        value: userRoles.root.value
      },
      firstName: "root"
    })
  },
  redis: {
    client: undefined,
    connect: (config) => {
      if (this.client === undefined) {
        const REDIS_HOST = process.env.REDIS_HOST || config.REDIS_HOST
        const REDIS_PORT = process.env.REDIS_PORT || config.REDIS_PORT
        const REDIS_PASSWORD = process.env.REDIS_PASSWORD || config.REDIS_PASSWORD

        this.client = redis.createClient({
          host: REDIS_HOST,
          port: REDIS_PORT,
          password: REDIS_PASSWORD
        })
      }

      return this.client
    },
    get: (key) => {
      const getAsync = promisify(this.client.get).bind(this.client)
      return getAsync(key)
    },
    set: (key, value) => this.client.set(key, value)
  }
}
