const { APIError } = require("../services/error")
const { Payment } = require("./model")
const { Quota } = require("../quota")
const { paymentTypes, paymentStatus } = require("../constants")
const { canPaymentBeCreated, canPaymentBeDeleted } = require("./helpers")
const { createMb, deleteMb } = require("./mb")

const create = async (req, res) => {
  const { body } = req
  const { user } = req.session

  const _quotas = await Quota.getMany({ _id: { $in: body.quotas } })
  if (!canPaymentBeCreated(_quotas, body.quotas)) {
    throw new APIError("Invalid payment IDs", 500)
  }

  const _payment = {
    ...body,
    ..._quotas.reduce((acc, { year, value }) => ({
      value: acc.value + value,
      quotasYear: [...acc.quotasYear, year]
    }), { value: 0, quotasYear: [] })
  }

  if (_payment.type === paymentTypes.mb) {
    _payment.mb = await createMb(_payment.value)
  } else {
    _payment.status = paymentStatus.paid
    _payment.paymentDate = Date.now()
  }

  const payment = await Payment.store(_payment, user._id)
  const quotas = await Quota.batchUpdate(_quotas.map(({ _id }) => _id), { payment: payment._id })

  res.json({ payment, quotas })
}

const update = async (req, res) => {
  const { body, params: { _id } } = req
  const { user } = req.session

  const payment = await Payment.update({ _id }, body, user._id)
  res.json(payment)
}

const del = async (req, res) => {
  const { _id } = req.params
  const { user } = req.session

  const _payment = await Payment.get({ _id })
  if (!canPaymentBeDeleted(_payment)) {
    throw new APIError(`Payment ${_id} can't be deleted`, 500)
  }

  await deleteMb(_payment.mb.id)
  const payment = await Payment.del({ _id: _payment._id }, {
    status: paymentStatus.canceled,
    mb: null
  }, user._id)

  const _quotas = await Quota.getMany({ payment: _payment._id })
  const quotas = await Quota.batchUpdate(_quotas.map(({ _id }) => _id), { payment: null })

  res.json({ payment, quotas })
}

module.exports = {
  create,
  update,
  del
}
