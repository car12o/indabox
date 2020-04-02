import React, { createContext, useContext } from "react"
import { withRouter } from "react-router-dom"
import { compose, set, last } from "lodash/fp"

const BASE_URL = process.env.REACT_APP_API_URL
const OPTIONS = {
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
    Authorization: `Bearer ${localStorage.token}`
  }
}

const resolve = async (promise) => {
  try {
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

    throw (new Error(`Status: ${status}`))
  } catch (error) {
    if (!error.stack) {
      throw new Error(error)
    }
    throw error
  }
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

const _ApiProvider = ({ children, history }) => {
  const wrap = (fn) => async (...args) => {
    const opts = last(args)
    try {
      const result = await fn(...args)
      return result
    } catch (error) {
      if (opts.throw) {
        throw error
      }

      history.push("/500")
      return {}
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

export const ApiProvider = withRouter(_ApiProvider)
export const useApi = () => useContext(ApiContext)
