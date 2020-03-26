const { isEmpty } = require("lodash/fp")
const { APIError } = require("../services/error")
const { Payment } = require("./model")
const { Quota } = require("../quota")
const { paymentTypes } = require("./helpers")
const { createMb } = require("./mb")

const create = async (req, res) => {
  const { body } = req
  const { user: { _id } } = req.session

  const quotas = await Quota.find({ _id: { $in: body.quotas }, payment: { $ne: null } })
  if (!isEmpty(quotas)) {
    throw new APIError("One or more quotas have payment already", 500)
  }

  body.createdBy = _id
  body.updatedBy = _id

  if (body.type === paymentTypes.mb) {
    body.mb = await createMb(body.value)
  }

  const payment = await Payment.create(body)
  try {
    await Quota.updateMany({ _id: { $in: body.quotas } }, { payment: payment._id })
    const quotas = await Quota.find({ _id: { $in: body.quotas } })

    res.json({ payment, quotas })
  } catch (error) {
    await Payment.deleteOne({ _id: payment._id })
    throw error
  }
}

const del = async (req, res) => {
  res.json({ ok: "del" })
}

module.exports = {
  create,
  del
}
