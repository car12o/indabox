import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash/fp';
import { partnersAc } from '../../store/actions';
import PartnerComponent from '../../components/Partner';

class Partner extends Component {
	state = {
		tab: 0,
	};

	componentDidMount() {
		const { partners, match, getPartner } = this.props;
		if (_.isEmpty(partners.selected.id)) {
			getPartner(match.params.id);
		}
	}

	handleChange = (event, tab) => {
		this.setState({ tab })
	};

	render() {
		const { selected } = this.props.partners;

		return (
			<PartnerComponent
				partner={selected}
				tab={this.state.tab}
				handleChange={this.handleChange}
			/>
		);
	}
}

const mapStateToProps = state => ({
	partners: state.partners
});

const mapDispatchToProps = dispatch => ({
	getPartner: (id) => dispatch(partnersAc.getPartner(id)),
	setPartner: (partner, history) => dispatch(partnersAc.setSelected(partner, history)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Partner);
