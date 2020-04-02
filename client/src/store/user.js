import { uniqBy } from "lodash/fp"

const updateUser = (state, user) => ({ ...state, ...user })

const resetUser = () => ({ logged: false })

const updatePaymentAndQuotas = (state, { payment, quotas: _quotas }) => {
  const quotas = uniqBy("_id", [..._quotas || [], ...state.quotas])
  const payments = uniqBy("_id", [payment, ...state.payments])
  return { ...state, quotas, payments }
}

const actions = {
  UPDATE_USER: updateUser,
  RESET_USER: resetUser,
  UPDATE_PAYMENT_QUOTAS: updatePaymentAndQuotas
}

export const user = (state = { logged: false }, { type, payload }) => {
  if (actions[type]) {
    return actions[type](state, payload)
  }
  return state
}
