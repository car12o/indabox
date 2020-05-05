import React, { createContext, useContext } from "react"
import { compose, set } from "lodash/fp"
import { useSnackbar } from "./SnackBar"

const BASE_URL = process.env.REACT_APP_API_URL
const OPTIONS = {
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
    Authorization: `Bearer ${localStorage.token}`
  }
}

const resolve = async (promise) => {
  const res = await promise
  const { status, headers } = res
  const body = await res.json()

  const token = headers.get("Token")
  if (token) {
    localStorage.setItem("token", token)
  }

  if (status < 300) {
    return { status, body }
  }

  if (status === 400) {
    const { payload } = body
    const err = payload.reduce((accm, { path, message }) => set(path, message, accm), {})
    return { status, err }
  }

  throw (new Error(`Status: ${status} \n ${JSON.stringify(body)}`))
}

const get = compose(
  resolve,
  (url) => fetch(`${BASE_URL}${url}`, { ...OPTIONS, method: "GET" })
)

const post = compose(
  resolve,
  (url, body) => fetch(`${BASE_URL}${url}`, { ...OPTIONS, method: "POST", body: JSON.stringify(body) })
)

const put = compose(
  resolve,
  (url, body) => fetch(`${BASE_URL}${url}`, { ...OPTIONS, method: "PUT", body: JSON.stringify(body) })
)

const del = compose(
  resolve,
  (url) => fetch(`${BASE_URL}${url}`, { ...OPTIONS, method: "DELETE" })
)

const ApiContext = createContext({})

export const ApiProvider = ({ children }) => {
  const { notify } = useSnackbar()

  const wrap = (fn) => async (...args) => {
    try {
      const result = await fn(...args)
      return result
    } catch (error) {
      notify(error.message)
      throw error
    }
  }

  return (
    <ApiContext.Provider value={{
      get: wrap(get),
      post: wrap(post),
      put: wrap(put),
      del: wrap(del)
    }}>
      {children}
    </ApiContext.Provider >
  )
}

export const useApi = () => useContext(ApiContext)
