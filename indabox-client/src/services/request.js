/**
 * request ...
 * @param {object} req
 */
export default (req) => async (dispatch) => {
  try {
    const options = {
      method: req.method,
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        Token: localStorage.token
      }
    }

    if (req.body) {
      Object.assign(options, { body: JSON.stringify(req.body) })
    }

    const res = await fetch(`${process.env.REACT_APP_API_URL}${req.url}`, options)
    const token = res.headers.get("Token")
    if (token) {
      localStorage.setItem("token", token)
    }

    dispatch({
      type: req.type,
      status: res.status,
      body: await res.json()
    })
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("error", e)
  }
}
