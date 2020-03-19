import React, { useState, useEffect } from "react"
import { createStore, combineReducers } from "redux"
import { Provider as ReduxProvider } from "react-redux"
import { compose } from "lodash/fp"
import { get } from "../services/api"
import { user } from "./user"
import { PageLoading } from "../components/PageLoading/PageLoading"

const store = compose(
  createStore,
  combineReducers
)({ user })


export const Provider = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const { dispatch } = store

  const fetchUser = async () => {
    try {
      const { body: payload } = await get("/state")
      dispatch({ type: "UPDATE_USER", payload })
      setLoading(false)
    } catch {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <ReduxProvider store={store}>
      {loading ? <PageLoading /> : children}
    </ReduxProvider>
  )
}
