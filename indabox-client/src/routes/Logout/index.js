import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userAc } from '../../store/actions';

class Logout extends Component {
	componentWillMount() {
		this.props.logout();
	}

	componentWillUpdate(props) {
		const { user, history } = props;
		if (!user.logged) {
			return history.push('/');
		}
	}

	render() {
		return (<span>Logout</span>);
	}
}


const mapStateToProps = state => ({
	user: state.user
});

const mapDispatchToProps = dispatch => ({
	logout: () => dispatch(userAc.logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
