import { h } from 'preact';
import { Router } from 'preact-router';
// import { createStore, applyMiddleware } from 'redux';
// import thunkMiddleware from 'redux-thunk';
// import Auth from './middleware/auth';
// import request from './services/request';
// import reducers from './store/reducers';
import './style';

// routes
import Home from './routes/home';

// const store = createStore(reducers, applyMiddleware(thunkMiddleware));
// request({
//     type: 'INITIAL-STATE',
//     url: '/state',
//     method: 'GET'
// })(response => store.dispatch(response));

const App = () => (
	<div id="app">
		<Router>
			<Home path="/" />
		</Router>
	</div>
);

export default App;
