import React, { useState, useEffect, useCallback } from "react"
import { get } from "../../services/api"
import { UserHeader } from "./UserHeader"
import { UserBody } from "./UserBody"

export const User = ({ user, updateUser, updatePayment }) => {
  const [{ titles, roles, countries }, setState] = useState({})

  const fetchMetadata = useCallback(async () => {
    const { body } = await get("/metadata")
    setState(body)
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
        updatePayment={updatePayment}
        titles={titles}
        roles={roles}
        countries={countries}
      />
    </>
  )
}
