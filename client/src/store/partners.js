const initialState = {
  search: "",
  sort: "firstName,1",
  limit: 14,
  page: 0
}

const setPartners = (state, partners) => ({ ...state, ...partners })

const actions = {
  SET_PARTNERS: setPartners
}

export const partners = (state = initialState, { type, payload }) => {
  if (actions[type]) {
    return actions[type](state, payload)
  }
  return state
}
