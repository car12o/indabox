import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPartner, setPartnersSelectedProperty, setPaymentInvoiceStatus } from '../../store/actions/partners';
import PartnerComponent from '../../components/Partner/partner';

class Partner extends Component {
	partnerDetailsView() {
		return [
			{ label: 'Voltar', color: 'secondary', fn: () => this.props.history.goBack() },
			{
				label: 'Editar', color: 'primary', fn: () => {
					this.setState({
						partnerDetails: {
							disabled: false,
							buttons: this.partnerDetailsEdit(),
						}
					});
				}
			},
		];
	}

	partnerDetailsEdit() {
		return [
			{
				label: 'Cancelar', color: 'secondary', fn: () => {
					this.props.getPartner(this.props.partners.selected.id);
					this.setState({
						partnerDetails: {
							disabled: true,
							buttons: this.partnerDetailsView(),
						}
					});
				}
			},
			{
				label: 'Gravar', color: 'primary', fn: () => {
					this.props.update(this.props.partners.selected);
					this.setState({
						partnerDetails: {
							disabled: true,
							buttons: this.partnerDetailsView(),
						}
					});
				},
			},
		];
	}

	state = {
		tab: 0,
		partnerDetails: {
			disabled: true,
			buttons: this.partnerDetailsView(),
		},
		quotas: {
			buttons: [
				{ label: 'Pagar manualmente', color: 'primary', fn: (v) => console.log(v) },
				{ label: 'Gerar referencia MB', color: 'primary', fn: (v) => console.log(v) }
			]
		}
	}

	componentWillMount() {
		const { match, getPartner } = this.props;
		getPartner(match.params.id);
	}

	handleChange = (event, tab) => {
		this.setState({ tab })
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
			/>
		);
	}
}

const mapStateToProps = state => ({
	partner: state.partners.selected
});

const mapDispatchToProps = dispatch => ({
	getPartner: id => dispatch(getPartner(id)),
	setProperty: (...args) => dispatch(setPartnersSelectedProperty(...args)),
	setPaymentInvoiceStatus: (...args) => dispatch(setPaymentInvoiceStatus(...args)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Partner);
