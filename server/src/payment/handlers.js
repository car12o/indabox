const { APIError } = require("../services/error")
const { Payment } = require("./model")
const { Quota } = require("../quota")
const { paymentTypes, paymentStatus, canPaymentBeCreated, canPaymentBeDeleted } = require("./helpers")
const { createMb, deleteMb } = require("./mb")

const create = async (req, res) => {
  const { body } = req
  const { user } = req.session

  const quotas = await Quota.getMany({ _id: { $in: body.quotas } })
  if (!canPaymentBeCreated(quotas, body.quotas)) {
    throw new APIError("Invalid payment IDs", 500)
  }

  const payment = {
    ...body,
    value: quotas.reduce((accm, { value }) => accm + value, 0)
  }

  if (payment.type === paymentTypes.mb) {
    payment.mb = await createMb(payment.value)
  } else {
    payment.status = paymentStatus.paid
    payment.paymentDate = Date.now()
  }

  const _payment = await Payment.store(payment, user._id)
  const _quotas = await Quota.batchUpdate(quotas.map(({ _id }) => _id), { payment: _payment._id })

  res.json(_quotas)
}

const update = async (req, res) => {
  const { body, params: { _id } } = req
  const { user } = req.session

  const _payment = await Payment.update({ _id }, body, user._id)
  res.json(_payment)
}

const del = async (req, res) => {
  const { _id } = req.params
  const { user } = req.session

  const payment = await Payment.get({ _id })
  if (!canPaymentBeDeleted(payment)) {
    throw new APIError(`Payment ${_id} can't be deleted`, 500)
  }

  await deleteMb(payment.mb.id)
  const _payment = await Payment.del({ _id: payment._id }, {
    status: paymentStatus.canceled,
    mb: null
  }, user._id)

  const quotas = await Quota.getMany({ payment: _payment._id })
  const _quotas = await Quota.batchUpdate(quotas.map(({ _id }) => _id), { payment: null })

  res.json(_quotas)
}

module.exports = {
  create,
  update,
  del
}
