import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import request from './services/request';
import createStore from './store';
import PrivateRoute from './components/PrivateRoute';
// import * as serviceWorker from './serviceWorker';

// Routes
import Home from './routes/Home/home';
import Login from './routes/Login/login';
import Logout from './routes/Logout/logout';

const theme = createMuiTheme({
    palette: {
        primary: { main: '#DA2155' },
        secondary: { main: '#525F7E', light: '#E5E5E5' },
        text: {
            primary: '#323C4E',
            secondary: '#DA2155',
        },
        background: {
            default: "#F0F2F4"
        },
    },
    typography: {
        useNextVariants: true,
    },
});

request({
    type: 'INITIAL-STATE',
    method: 'GET',
    url: '/state',
    body: null,
})(res => {
    const store = createStore(res);

    ReactDOM.render((
        <Provider store={store}>
            <Router>
                <MuiThemeProvider theme={theme}>
                    <CssBaseline />
                    <Switch>
                        <Route path="/login" component={Login} />
                        <PrivateRoute path="/logout" component={Logout} store={store} />
                        <PrivateRoute path="/" component={Home} store={store} />
                    </Switch>
                </MuiThemeProvider>
            </Router>
        </Provider>
    ), document.getElementById('root'));
});

// serviceWorker.unregister();
