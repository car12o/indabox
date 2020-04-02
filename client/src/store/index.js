import React, { useState, useEffect } from "react"
import { createStore, combineReducers } from "redux"
import { Provider as ReduxProvider } from "react-redux"
import { compose } from "lodash/fp"
import { useApi } from "../services/api"
import { user } from "./user"
import { PageLoading } from "../components/PageLoading/PageLoading"

const store = compose(
  createStore,
  combineReducers
)({ user })

export const StoreProvider = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const api = useApi()
  const { dispatch, getState } = store
  const { user } = getState()

  const fetchUser = async () => {
    try {
      const { body: payload } = await api.get("/state", { throw: true })
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
      {loading ? <PageLoading /> : children({ logged: user.logged })}
    </ReduxProvider>
  )
}
