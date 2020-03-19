import { compose, set } from "lodash/fp"

const BASE_URL = process.env.REACT_APP_API_URL
const OPTIONS = {
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
    Token: localStorage.token
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
      const err = payload.reduce((accm, { path, err }) => set(path, err, accm), {})
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

export const get = compose(
  resolve,
  (url) => fetch(`${BASE_URL}${url}`, { ...OPTIONS, method: "GET" })
)

export const post = compose(
  resolve,
  (url, body) => fetch(`${BASE_URL}${url}`, { ...OPTIONS, method: "POST", body: JSON.stringify(body) })
)

export const patch = compose(
  resolve,
  (url, body) => fetch(`${BASE_URL}${url}`, { ...OPTIONS, method: "PATCH", body: JSON.stringify(body) })
)

export const del = compose(
  resolve,
  (url) => fetch(`${BASE_URL}${url}`, { ...OPTIONS, method: "DELETE" })
)
