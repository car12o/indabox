import React, { useEffect } from "react"
import { connect } from "react-redux"
import { useApi } from "../../services/api"
import { PageLoading } from "../../components/PageLoading/PageLoading"

const _Logout = ({ history, dispatch }) => {
  const api = useApi()

  const logout = async () => {
    await api.get("/logout")
    dispatch({ type: "RESET_USER" })
    history.push("/")
  }

  useEffect(() => {
    logout()
  }, [])

  return <PageLoading />
}

export const Logout = connect()(_Logout)
