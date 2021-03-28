import React, { createContext, useContext } from "react"
import { compose, set, last } from "lodash/fp"
import { useSnackbar } from "./SnackBar"

const BASE_URL = process.env.REACT_APP_API_URL
const options = () => ({
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
    Authorization: `Bearer ${localStorage.token}`
  }
})

const resolve = async (promise, file = false) => {
  const res = await promise
  const { status, headers } = res
  let body
  if (file) {
    body = await res.blob()
  } else {
    body = await res.json()
  }

  const token = headers.get("Authorization")
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
  (url) => fetch(`${BASE_URL}${url}`, { ...options(), method: "GET" })
)

const getFile = compose(
  (promise) => resolve(promise, true),
  (url) => fetch(`${BASE_URL}${url}`, { ...options(), method: "GET" })
)

const post = compose(
  resolve,
  (url, body) => fetch(`${BASE_URL}${url}`, { ...options(), method: "POST", body: JSON.stringify(body) })
)

const put = compose(
  resolve,
  (url, body) => fetch(`${BASE_URL}${url}`, { ...options(), method: "PUT", body: JSON.stringify(body) })
)

const del = compose(
  resolve,
  (url) => fetch(`${BASE_URL}${url}`, { ...options(), method: "DELETE" })
)

const ApiContext = createContext({})

export const ApiProvider = ({ children }) => {
  const { notify } = useSnackbar()

  const wrap = (fn) => async (...args) => {
    const opts = { notify: true, ...last(args) }
    try {
      const result = await fn(...args)
      return result
    } catch (error) {
      if (opts.notify) {
        notify(error.message)
      }
      throw error
    }
  }

  return (
    <ApiContext.Provider value={{
      get: wrap(get),
      getFile: wrap(getFile),
      post: wrap(post),
      put: wrap(put),
      del: wrap(del)
    }}>
      {children}
    </ApiContext.Provider >
  )
}

export const useApi = () => useContext(ApiContext)
