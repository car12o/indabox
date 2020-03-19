import React from "react"
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"
import { connect } from "react-redux"
import { Dashboard, Login, Logout, Partners, Partner, Profile } from "./routes"
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute"
import { Drawer } from "./components/Drawer/Drawer"


const _App = ({ logged }) => (
  <Router>
    <Switch>
      <Route exact path="/login" component={Login} />
      <PrivateRoute exact path="/logout" component={Logout} logged={logged} />
      <Drawer>
        <PrivateRoute exact path="/" component={Dashboard} logged={logged} />
        <PrivateRoute exact path="/partners" component={Partners} logged={logged} />
        <PrivateRoute exact path="/partners/:id" component={Partner} logged={logged} />
        <PrivateRoute exact path="/profile" component={Profile} logged={logged} />
      </Drawer>
      <Redirect to="/" />
    </Switch>
  </Router>
)

export const App = connect(({ user: { logged } }) => ({ logged }))(_App)
