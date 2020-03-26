const { APIError } = require("../../services/error")
const { Mb } = require("./model")
const { getPaymentRef } = require("./helpers")

const findId = (refIds) => {
  let id
  refIds
    .sort((a, b) => a - b)
    .every((value, i) => {
      id = i
      return value === i
    })

  if (id + 1 === refIds.length) {
    id += 1
    if (id > 9999) {
      throw new APIError("MB reference limit reached", 500)
    }
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

module.exports = {
  createMb
}
