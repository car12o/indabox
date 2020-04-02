import React, { useState, useEffect, useCallback } from "react"
import { useApi } from "../../services/api"
import { UserHeader } from "./UserHeader"
import { UserBody } from "./UserBody"

export const User = ({ user, updateUser, updatePaymentAndQuotas }) => {
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
      />
      <UserBody
        user={user}
        updateUser={updateUser}
        updatePaymentAndQuotas={updatePaymentAndQuotas}
        metadata={metadata}
      />
    </>
  )
}
