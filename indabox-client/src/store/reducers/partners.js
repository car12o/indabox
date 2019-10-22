import fp from "lodash/fp"
import { createUser } from "../../services/transform"

function updatePartnersList(state, action) {
  if (action.status === 200) {
    return fp.set("list", action.body.map((partner) => createUser(partner)), state)
  }

  return state
}

function updatePartner(state, action) {
  if (action.status === 200) {
    return fp.set("selected", createUser(action.body), state)
  }

  if (action.status === 400) {
    return action.body.payload.reduce((accum, elem) => {
      if (fp.has(`selected.${elem.path}.error`, accum)) {
        return fp.set(`selected.${elem.path}.error`, elem.err, accum)
      }
      return accum
    }, state)
  }

  return state
}

function setPartnerProperty(state, action) {
  const { path, value } = action

  if (fp.has(`selected.${path}.value`, state)) {
    const newState = fp.set(`selected.${path}.value`, value, state)

    if (fp.has(`selected.${path}.error`, newState)) {
      return fp.set(`selected.${path}.error`, null, newState)
    }

    return newState
  }

  return fp.set(`selected.${path}`, value, state)
}

function togglePartnerQuotaSelected(state, action) {
  const { quotas } = state.selected
  const { ids } = action

  const newQuotas = quotas.map((quota) => ({ ...quota, selected: ids.includes(quota.id) }))

  return fp.set("selected.quotas", newQuotas, state)
}

function setPaymentInvoiceStatus(state, action) {
  const { _id, invoiceEmited } = action.body

  const payments = state.selected.payments.map((payment) => {
    if (_id === payment.id) {
      return fp.set("invoiceEmited", invoiceEmited, payment)
    }
    return payment
  })

  return fp.set("selected.payments", payments, state)
}

const handlers = {
  UPDATE_PARTNERS_LIST: updatePartnersList,
  UPDATE_PARTNER: updatePartner,
  SET_PARTNER_PROPERTY: setPartnerProperty,
  TOGGLE_PARTNER_QUOTE_SELECTED: togglePartnerQuotaSelected,
  SET_PAYMENT_INVOICE_STATUS: setPaymentInvoiceStatus
}

const initialState = {
  list: [],
  selected: createUser({})
}

const partnersReducer = (state = initialState, action) => {
  if (fp.has(action.type, handlers)) {
    return handlers[action.type](state, action)
  }

  return state
}

export default partnersReducer
