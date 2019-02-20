import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from "react-redux";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
// import * as serviceWorker from './serviceWorker';
import reducers from './store/reducers';
import PrivateRoute from './components/PrivateRoute';

// Routes
import Home from './routes/Home';
import Login from './routes/Login';

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

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

ReactDOM.render((
    <Provider store={store}>
        <Router>
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                <Switch>
                    <Route path="/login" component={Login} />
                    <PrivateRoute path="/" component={Home} store={store} />
                </Switch>
            </MuiThemeProvider>
        </Router>
    </Provider>
), document.getElementById('root'));

// serviceWorker.unregister();
