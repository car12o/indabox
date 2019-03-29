import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { partnersAc } from '../../store/actions';
import PartnerComponent from '../../components/Partner';

class Profile extends Component {
	state = {
		tab: 1,
	};

	handleChange = (event, tab) => {
		this.setState({ tab })
	};

	render() {
		const { user } = this.props;

		return (
			<PartnerComponent
				partner={user}
				tab={this.state.tab}
				handleChange={this.handleChange}
				profile
			/>
		);
	}
}

const mapStateToProps = state => ({
	user: state.user
});

export default connect(mapStateToProps)(Profile);
