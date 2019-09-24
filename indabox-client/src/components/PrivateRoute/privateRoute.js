import React from "react"
import { Route, Redirect } from "react-router-dom"

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { logged } = rest.store.getState().user
  return (
    <Route
      {...rest}
      render={props =>
        logged
          ? (
            <Component {...props} />
          )
          : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          )
      }
    />
  )
}

export default PrivateRoute
