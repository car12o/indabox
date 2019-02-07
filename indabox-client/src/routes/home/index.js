import React, { Component } from 'react';
import { connect } from 'react-redux';

class Home extends Component {
	constructor() {
		super();
		this.state = {
			drawerOpened: true
		};
	}

	render() {
		return (
			<div>
				<h1>Home</h1>
			</div>
		);
	}
}

// const mapStateToProps = state => ({
// 	user: state.user
// });

// const mapDispatchToProps = dispatch => ({
// 	setEmail: (email) => dispatch(userAc.setEmail(email)),
// 	setPassword: (password) => dispatch(userAc.setPassword(password)),
// 	login: (email, password) => dispatch(userAc.login(email, password))
// });

export default connect()(Home);
