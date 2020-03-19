import React from "react"
import { connect } from "react-redux"
import { User } from "../../components/Partner/User"

const _Profile = ({ partner, updateUser, updatePayment }) => (
  <User user={partner} updateUser={updateUser} updatePayment={updatePayment} />
)

export const Profile = connect(
  ({ user: partner }) => ({ partner }),
  (dispatch) => ({
    updateUser: (payload) => dispatch({ type: "UPDATE_USER", payload }),
    updatePayment: (payload) => dispatch({ type: "UPDATE_PAYMENT", payload })
  })
)(_Profile)
