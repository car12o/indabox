const mongo = require("./mongo")
const redis = require("./redis")

const connect = async () => {
  await mongo.connect()
  await redis.connect()
}

module.exports = {
  connect,
  mongo,
  redis
}
