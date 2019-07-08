import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	getPartner, setPartnerProperty, setPaymentInvoiceStatus,
	updatePartnerIdentification, updatePartnerContact, updatePartnerNotes
} from '../../store/actions/partners';
import PartnerComponent from '../../components/Partner/partner';

class Partner extends Component {
	view(key) {
		return [
			{ label: 'Voltar', color: 'secondary', fn: () => this.props.history.goBack() },
			{
				label: 'Editar', color: 'primary', fn: () => {
					this.setState({
						[key]: {
							disabled: false,
							buttons: this.edit(key),
							action: this.state[key].action,
						}
					});
				}
			},
		];
	}

	edit(key) {
		return [
			{
				label: 'Cancelar', color: 'secondary', fn: () => {
					this.props.getPartner(this.props.partner.id);
					this.setState({
						[key]: {
							disabled: true,
							buttons: this.view(key),
							action: this.state[key].action,
						}
					});
				}
			},
			{
				label: 'Gravar', color: 'primary', fn: action => {
					this.props[action](this.props.partner);
					this.setState({
						[key]: {
							disabled: true,
							buttons: this.view(key),
							action: this.state[key].action,
						}
					});
				},
			},
		];
	}

	initialState(tab) {
		return {
			tab,
			identification: {
				disabled: true,
				buttons: this.view('identification'),
				action: 'updatePartnerIdentification',
			},
			contacts: {
				disabled: true,
				buttons: this.view('contacts'),
				action: 'updatePartnerContact',
			},
			notes: {
				disabled: true,
				buttons: this.view('notes'),
				action: 'updatePartnerNotes',
			},
			quotas: {
				buttons: [
					{ label: 'Pagar manualmente', color: 'primary', fn: (v) => console.log(v) },
					{ label: 'Gerar referencia MB', color: 'primary', fn: (v) => console.log(v) }
				]
			}
		}
	}

	state = this.initialState(0);

	componentWillMount() {
		const { match, getPartner } = this.props;
		getPartner(match.params.id);
	}

	handleChange = (event, tab) => {
		this.setState(this.initialState(tab));
	};

	render() {
		const { partner, setProperty, setPaymentInvoiceStatus } = this.props;

		return (
			<PartnerComponent
				tab={this.state.tab}
				partner={partner}
				handleChange={this.handleChange}
				setProperty={setProperty}
				setPaymentInvoiceStatus={setPaymentInvoiceStatus}
				identification={this.state.identification}
				contacts={this.state.contacts}
				notes={this.state.notes}
				quotas={this.state.quotas}
			/>
		);
	}
}

const mapStateToProps = state => ({
	partner: state.partners.selected
});

const mapDispatchToProps = dispatch => ({
	getPartner: id => dispatch(getPartner(id)),
	updatePartnerIdentification: data => dispatch(updatePartnerIdentification(data)),
	updatePartnerContact: data => dispatch(updatePartnerContact(data)),
	updatePartnerNotes: data => dispatch(updatePartnerNotes(data)),
	setProperty: (...args) => dispatch(setPartnerProperty(...args)),
	setPaymentInvoiceStatus: (...args) => dispatch(setPaymentInvoiceStatus(...args)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Partner);
