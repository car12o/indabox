import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPartner, setPartnerProperty, setPaymentInvoiceStatus, updatePartner } from '../../store/actions/partners';
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
						}
					});
				}
			},
			{
				label: 'Gravar', color: 'primary', fn: () => {
					this.props.updatePartner(this.props.partner);
					this.setState({
						[key]: {
							disabled: true,
							buttons: this.view(key),
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
			},
			contacts: {
				disabled: true,
				buttons: this.view('contacts'),
			},
			notes: {
				disabled: true,
				buttons: this.view('notes'),
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
	updatePartner: data => dispatch(updatePartner(data)),
	setProperty: (...args) => dispatch(setPartnerProperty(...args)),
	setPaymentInvoiceStatus: (...args) => dispatch(setPaymentInvoiceStatus(...args)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Partner);
