import React, { Component } from 'react';
import { connect } from 'react-redux';
import { partnersAc } from '../../store/actions';
import PartnerComponent from '../../components/Partner';

class Partner extends Component {
	state = {
		tab: 1,
	};

	componentDidMount() {
		const { partners, match, history, setPartner } = this.props;
		if (partners.selected.isEmpty) {
			setPartner(parseInt(match.params.id, 10), history);
		}
	}

	handleChange = (event, tab) => {
		this.setState({ tab })
	};

	render() {
		const { partners } = this.props;
		const partner = partners.selected.value;

		return (
			<PartnerComponent
				partner={partner}
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
	setPartner: (partner, history) => dispatch(partnersAc.setSelected(partner, history)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Partner);
