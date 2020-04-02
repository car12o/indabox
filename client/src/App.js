import React from "react"
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"
import { Dashboard, Login, Logout, Partners, Partner, Profile, Error } from "./routes"
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute"
import { Drawer } from "./components/Drawer/Drawer"
import { ApiProvider } from "./services/api"
import { StoreProvider } from "./store"


export const App = () => (
  <Router>
    <ApiProvider>
      <StoreProvider>
        {({ logged }) => (
          <Switch>
            <Route exact path="/login" component={Login} />
            <PrivateRoute exact path="/logout" component={Logout} logged={logged} />
            <Route exact path="/500" component={Error} />
            <Drawer>
              <Switch>
                <PrivateRoute exact path="/" component={Dashboard} logged={logged} />
                <PrivateRoute exact path="/partners" component={Partners} logged={logged} />
                <PrivateRoute exact path="/partners/:id" component={Partner} logged={logged} />
                <PrivateRoute exact path="/profile" component={Profile} logged={logged} />
                <Redirect to="/" />
              </Switch>
            </Drawer>
          </Switch>
        )}
      </StoreProvider>
    </ApiProvider>
  </Router>
)
