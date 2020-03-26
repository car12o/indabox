const uuidv4 = require("uuid/v1")
const { merge } = require("lodash/fp")
const { redis } = require("./database")

const redisGet = async (token) => {
  const values = await redis.get(token)
  return JSON.parse(values)
}

const redisSet = async (session) => {
  const { token } = session
  const values = JSON.stringify(session)
  await redis.set(token, values)
}

async function set(values) {
  const { password, ..._values } = values
  const session = merge(this, _values)
  await redisSet(session)
}

const get = async (token = uuidv4()) => {
  let session = await redisGet(token)
  if (!session) {
    session = { token, logged: false }
    await redisSet(session)
  }

  return { ...session, set: set.bind(session) }
}

module.exports = {
  session: {
    get
  }
}
