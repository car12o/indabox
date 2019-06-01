
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setUserProperty, getUser, updateUser } from '../../store/actions/user';
import PartnerComponent from '../../components/Partner/partner';

class Profile extends Component {
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
					this.props.getUser(this.props.user.id);
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
					this.props.updateUser(this.props.user);
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

	handleChange = (event, tab) => {
		this.setState(this.initialState(tab));
	};

	render() {
		const { user, setProperty } = this.props;

		return (
			<PartnerComponent
				tab={this.state.tab}
				partner={user}
				handleChange={this.handleChange}
				setProperty={setProperty}
				// setPaymentInvoiceStatus={setPaymentInvoiceStatus}
				identification={this.state.identification}
				contacts={this.state.contacts}
				notes={this.state.notes}
				quotas={this.state.quotas}
			/>
		);
	}
}

const mapStateToProps = state => ({
	user: state.user
});


const mapDispatchToProps = dispatch => ({
	setProperty: (...args) => dispatch(setUserProperty(...args)),
	getUser: id => dispatch(getUser(id)),
	updateUser: data => dispatch(updateUser(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
