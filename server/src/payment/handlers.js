const { APIError } = require("../services/error")
const { Payment } = require("./model")
const { Quota } = require("../quota")
const { paymentTypes, paymentStatus, canPaymentBeCreated, canPaymentBeDeleted } = require("./helpers")
const { createMb, deleteMb } = require("./mb")

const create = async (req, res) => {
  const { body } = req
  const { user } = req.session

  const quotas = await Quota.find({ _id: { $in: body.quotas } })
  const payment = {
    ...body,
    value: quotas.reduce((accm, { value }) => accm + value, 0),
    createdBy: user._id,
    updatedBy: user._id
  }

  if (!canPaymentBeCreated(quotas, body.quotas)) {
    throw new APIError("Invalid payment IDs", 500)
  }

  if (payment.type === paymentTypes.mb) {
    payment.mb = await createMb(payment.value)
  } else {
    payment.status = paymentStatus.paid
    payment.paymentDate = Date.now()
  }

  const _payment = await Payment.create(payment)
  const _quotas = await Quota.findManyAndUpdate({ _id: { $in: payment.quotas } }, { payment: _payment._id })
  res.json({ payment: _payment, quotas: _quotas })
}

const update = async (req, res) => {
  const { body, params: { id } } = req
  const { user } = req.session

  const payment = {
    ...body,
    updatedBy: user._id
  }

  const _payment = await Payment.findByIdAndUpdate(id, payment, { new: true })
  res.json(_payment)
}

const del = async (req, res) => {
  const { id } = req.params
  const { user } = req.session

  const payment = await Payment.findById(id)
  if (!canPaymentBeDeleted(payment)) {
    throw new APIError(`Payment ${id} can't be deleted`, 500)
  }

  await deleteMb(payment.mb.id)
  const _payment = await Payment.findByIdAndUpdate({ _id: payment._id }, {
    status: paymentStatus.canceled,
    updatedBy: user._id,
    deletedAt: Date.now(),
    deletedBy: user._id,
    mb: null
  }, { new: true })

  const quotas = await Quota.findManyAndUpdate({ payment: _payment._id }, { payment: null })
  res.json({ payment: _payment, quotas })
}

module.exports = {
  create,
  update,
  del
}
