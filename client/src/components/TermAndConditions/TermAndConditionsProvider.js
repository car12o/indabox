import React from "react"
import { connect } from "react-redux"
import { useApi } from "../../services/Api"
import { TermAndConditions } from "./TermAndConditions"

const _TermAndConditionsProvider = ({ children, user, dispatch }) => {
  const api = useApi()

  const acceptTermsAndConditions = async () => {
    const { body: payload } = await api.put(`/users/${user._id}`, { termsAndConditions: true })
    dispatch({ type: "UPDATE_USER", payload })
  }

  return (
    <>
      <TermAndConditions
        open={!user.termsAndConditions}
        label="Aceitar"
        onClick={acceptTermsAndConditions}
      />
      {children}
    </>
  )
}

export const TermAndConditionsProvider = connect(({ user }) => ({ user }))(_TermAndConditionsProvider)
