
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setUserProperty, getUser, updateUserIdentification, updateUserContact, updateUserNotes } from '../../store/actions/user';
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
					this.props.getUser(this.props.user.id);
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
					this.props[action](this.props.user);
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
				action: 'updateUserIdentification',
			},
			contacts: {
				disabled: true,
				buttons: this.view('contacts'),
				action: 'updateUserContact',
			},
			notes: {
				disabled: true,
				buttons: this.view('notes'),
				action: 'updateUserNotes',
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
	updateUserIdentification: data => dispatch(updateUserIdentification(data)),
	updateUserContact: data => dispatch(updateUserContact(data)),
	updateUserNotes: data => dispatch(updateUserNotes(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
