const { compose, isUndefined } = require("lodash/fp")
const { APIError } = require("../../services/error")
const { Mb } = require("./model")
const { getPaymentRef } = require("./helpers")

const findInSequence = (collection) => {
  let value
  collection.every((v, i) => {
    value = v === i ? undefined : i
    return v === i
  })
  return value
}

const findId = (refIds) => {
  const id = compose(
    (id) => (isUndefined(id) ? refIds.length : id),
    findInSequence,
    (arr) => arr.sort((a, b) => a - b)
  )(refIds)

  if (id > 10000) {
    throw new APIError("MB reference limit reached", 500)
  }

  return id
}

const createMb = async (value) => {
  const mb = await Mb.findOne()

  if (!mb) {
    const id = 0
    await Mb.create({ refIds: [id] })

    return getPaymentRef(id, value)
  }

  const id = findId(mb.refIds)
  await Mb.updateOne({ _id: mb._id }, { $push: { refIds: id } })

  return getPaymentRef(id, value)
}

const deleteMb = async (id) => {
  const mb = await Mb.findOne()
  if (!mb) {
    throw new APIError("No MB reference found", 500)
  }

  const refIds = mb.refIds.filter((refId) => refId !== id)
  if (refIds.length === mb.refIds.length) {
    throw new APIError(`Invalid MB reference id: ${id}`, 500)
  }

  await Mb.replaceOne({}, { refIds })
}

module.exports = {
  findId,
  createMb,
  deleteMb
}
