const mongoose = require("mongoose")
const redis = require("redis")
const { promisify } = require("util")
const { User, userRoles } = require("../models/user")
const { hashPassword } = require("../services/crypto")

module.exports = {
  mongo: {
    connect: async function connect(config) {
      const {
        DB_USER,
        DB_PASSWORD,
        ROOT_EMAIL,
        ROOT_PASSWORD
      } = process.env

      await mongoose.connect(
        `mongodb://${DB_USER}:${DB_PASSWORD}@${config.host}:\
                ${config.port}/${config.name}?authSource=admin`,
        {
          useNewUrlParser: true,
          useCreateIndex: true,
          socketTimeoutMS: 0,
          keepAlive: true,
          reconnectTries: 30
        }
      )

      const root = {
        email: ROOT_EMAIL,
        password: ROOT_PASSWORD
      }

      const hasAdmin = await this.hasAdmin(root)
      if (!hasAdmin) {
        this.createAdmin(root)
        log.info("Created admin user")
      }
    },
    hasAdmin: ({ email }) => User.findOne({ email }),
    createAdmin: ({ email, password }) => User.create({
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
        this.client = redis.createClient({
          host: config.host,
          port: config.port,
          password: process.env.REDIS_PASSWORD
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
