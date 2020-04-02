import React from "react"
import { connect } from "react-redux"
import { User } from "../../components/Partner/User"

const _Profile = ({ partner, updateUser, updatePaymentAndQuotas }) => (
  <User user={partner} updateUser={updateUser} updatePaymentAndQuotas={updatePaymentAndQuotas} />
)

export const Profile = connect(
  ({ user: partner }) => ({ partner }),
  (dispatch) => ({
    updateUser: (payload) => dispatch({ type: "UPDATE_USER", payload }),
    updatePaymentAndQuotas: (payload) => dispatch({ type: "UPDATE_PAYMENT_QUOTAS", payload })
  })
)(_Profile)
