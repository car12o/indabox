import React, { useEffect } from "react"
import { connect } from "react-redux"
import { get } from "../../services/api"
import { PageLoading } from "../../components/PageLoading/PageLoading"

const _Logout = ({ dispatch }) => {
  const logout = async () => {
    await get("/logout")
    dispatch({ type: "RESET_USER" })
  }

  useEffect(() => {
    logout()
  }, [])

  return <PageLoading />
}

export const Logout = connect()(_Logout)
