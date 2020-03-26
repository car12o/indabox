const redis = require("redis")
const { promisify } = require("util")
const config = require("../../../config/default.json")

let client

const connect = () => {
  const REDIS_HOST = process.env.REDIS_HOST || config.REDIS_HOST
  const REDIS_PORT = process.env.REDIS_PORT || config.REDIS_PORT
  const REDIS_PASSWORD = process.env.REDIS_PASSWORD || config.REDIS_PASSWORD

  client = redis.createClient({
    host: REDIS_HOST,
    port: REDIS_PORT,
    password: REDIS_PASSWORD
  })
}

const get = (key) => {
  const getAsync = promisify(client.get).bind(client)
  return getAsync(key)
}

const set = (key, value) => client.set(key, value)

module.exports = {
  connect,
  get,
  set
}
