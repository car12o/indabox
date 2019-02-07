import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from "react-redux";
import './index.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
// import * as serviceWorker from './serviceWorker';
import reducers from './store/reducers';

// Routes
import Home from './routes/home';
import Login from './routes/login';

const theme = createMuiTheme({
    palette: {
        primary: { main: '#DA2155' },
        secondary: { main: '#525F7E' },
        text: {
            primary: '#323C4E',
            secondary: '#DA2155',
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
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/login" component={Login} />
                </Switch>
            </MuiThemeProvider>
        </Router>
    </Provider>
), document.getElementById('root'));

// serviceWorker.unregister();
