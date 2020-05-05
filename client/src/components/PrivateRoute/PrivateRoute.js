import React from "react"
import { Route, Redirect } from "react-router-dom"
import { connect } from "react-redux"

const _PrivateRoute = ({ user, role, ...props }) => {
  if (!user.logged) {
    return <Redirect to={{ pathname: "/login" }} />
  }

  if (role && user.role > role) {
    return <Redirect to={{ pathname: "/profile" }} />
  }

  return <Route {...props} />
}

export const PrivateRoute = connect(({ user }) => ({ user }))(_PrivateRoute)
