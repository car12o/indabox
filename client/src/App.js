import React from "react"
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"
import { Dashboard, Login, Logout, Partners, Partner, Profile } from "./routes"
import { TermAndConditionsProvider } from "./components/TermAndConditions"
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute"
import { Drawer } from "./components/Drawer/Drawer"
import { ApiProvider } from "./services/Api"
import { SnackbarProvider } from "./services/SnackBar"
import { StoreProvider } from "./store"
import { userRoles } from "./constants"

export const App = () => (
  <Router>
    <SnackbarProvider>
      <ApiProvider>
        <StoreProvider>
          <Switch>
            <Route exact path="/login" component={Login} />
            <PrivateRoute exact path="/logout" component={Logout} />
            <TermAndConditionsProvider>
              <Drawer>
                <Switch>
                  <PrivateRoute exact path="/" component={Dashboard} role={userRoles.admin} />
                  <PrivateRoute exact path="/partners" component={Partners} role={userRoles.admin} />
                  <PrivateRoute exact path="/partners/:id" component={Partner} role={userRoles.admin} />
                  <PrivateRoute exact path="/profile" component={Profile} />
                  <Redirect to="/" />
                </Switch>
              </Drawer>
            </TermAndConditionsProvider>
          </Switch>
        </StoreProvider>
      </ApiProvider>
    </SnackbarProvider>
  </Router>
)
