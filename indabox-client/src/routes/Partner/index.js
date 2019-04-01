import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash/fp';
import { partnersAc } from '../../store/actions';
import PartnerComponent from '../../components/Partner';

class Partner extends Component {
	view() {
		const { history } = this.props;

		return {
			leftButton: {
				fn: () => {
					history.goBack();
					this.setState({
						disabled: false,
						buttons: this.edit(),
					});
				},
				label: 'Voltar'
			},
			rightButton: {
				fn: () => this.setState({
					disabled: false,
					buttons: this.edit(),
				}),
				label: 'Editar',
			}
		};
	}

	edit() {
		const { partners, update } = this.props;

		return {
			leftButton: {
				fn: () => this.setState({
					disabled: true,
					buttons: this.view(),
				}),
				label: 'Cancelar'
			},
			rightButton: {
				fn: () => {
					update(partners.selected);
					this.setState({
						disabled: true,
						buttons: this.view(),
					});
				},
				label: 'Gravar',
			}
		};
	}

	state = {
		tab: 0,
		disabled: true,
		buttons: this.view(),
	}

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
		const { partners, setFirstName } = this.props;

		return (
			<PartnerComponent
				partner={partners.selected}
				partnerActions={{
					setFirstName,
				}}
				tab={this.state.tab}
				handleChange={this.handleChange}
				disabled={this.state.disabled}
				buttons={this.state.buttons}
			/>
		);
	}
}

const mapStateToProps = state => ({
	partners: state.partners
});

const mapDispatchToProps = dispatch => ({
	getPartner: id => dispatch(partnersAc.getPartner(id)),
	setPartner: (partner, history) => dispatch(partnersAc.setSelected(partner, history)),
	setFirstName: firstName => dispatch(partnersAc.setFirstName(firstName)),
	update: body => dispatch(partnersAc.update(body))
});

export default connect(mapStateToProps, mapDispatchToProps)(Partner);
