const updateUser = (state, user) => ({ ...state, ...user })

const resetUser = () => ({ logged: false })

const updatePayment = (state, payment) => {
  console.log("payment = ", payment)
  return state
}

const actions = {
  UPDATE_USER: updateUser,
  RESET_USER: resetUser,
  UPDATE_PAYMENT: updatePayment
}

export const user = (state = { logged: false }, { type, payload }) => {
  if (actions[type]) {
    return actions[type](state, payload)
  }
  return state
}
