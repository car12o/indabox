import React, { useState, useEffect, useCallback } from "react"
import { connect } from "react-redux"
import { useApi } from "../../services/Api"
import { UserHeader } from "./UserHeader"
import { UserBody } from "./UserBody"

const _User = ({ user, updateUser, updatePaymentAndQuotas, loggedUser }) => {
  const [metadata, setMetadata] = useState({})
  const api = useApi()

  const fetchMetadata = useCallback(async () => {
    const { body } = await api.get("/metadata")
    setMetadata(body)
  }, [])

  useEffect(() => {
    fetchMetadata()
  }, [])

  return (
    <>
      <UserHeader
        user={user}
        breadcrumb={"Sócios"}
        updateUser={updateUser}
        loggedUser={loggedUser}
      />
      <UserBody
        user={user}
        updateUser={updateUser}
        updatePaymentAndQuotas={updatePaymentAndQuotas}
        metadata={metadata}
        loggedUser={loggedUser}
      />
    </>
  )
}

export const User = connect(({ user }) => ({ loggedUser: user }))(_User)
