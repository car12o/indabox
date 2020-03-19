import React from "react"
import { Route, Redirect } from "react-router-dom"

export const PrivateRoute = ({ logged, ...props }) => (
  logged
    ? <Route {...props} />
    : <Redirect to={{ pathname: "/login" }} />
)
