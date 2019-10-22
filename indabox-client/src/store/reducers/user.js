import fp from "lodash/fp"
import { createUser } from "../../services/transform"

function updateUserState(state, action) {
  if (action.status === 200) {
    return createUser(action.body)
  }

  if (action.status === 400) {
    return action.body.payload.reduce((accum, elem) => {
      if (fp.has(`${elem.path}.error`, accum)) {
        return fp.set(`${elem.path}.error`, elem.err, accum)
      }
      return accum
    }, state)
  }

  return state
}

function setPropery(state, action) {
  const { path, value } = action

  if (fp.has(`${path}.value`, state)) {
    const newState = fp.set(`${path}.value`, value, state)

    if (fp.has(`${path}.error`, newState)) {
      return fp.set(`${path}.error`, null, newState)
    }

    return newState
  }

  return fp.set(path, value, state)
}

// function togglePartnerQuotaSelected(state, action) {
//   const { quotas } = state.selected
//   const { ids } = action

//   const newQuotas = quotas.map((quota) => ({ ...quota, selected: ids.includes(quota.id) }))

//   return fp.set("selected.quotas", newQuotas, state)
// }

// function setPaymentInvoiceStatus(state, action) {
//   const { _id, invoiceEmited } = action.body

//   const payments = state.selected.payments.map((payment) => {
//     if (_id === payment.id) {
//       return fp.set("invoiceEmited", invoiceEmited, payment)
//     }
//     return payment
//   })

//   return fp.set("selected.payments", payments, state)
// }

const handlers = {
  SET_PROPERTY: setPropery,
  UPDATE_USER_STATE: updateUserState
}

const userReducer = (state = {}, action) => {
  if (fp.has(action.type, handlers)) {
    return handlers[action.type](state, action)
  }

  return state
}

export default userReducer
