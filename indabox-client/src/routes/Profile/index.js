
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userAc } from '../../store/actions';
import PartnerComponent from '../../components/Partner';

class Profile extends Component {
	view() {
		return {
			leftButton: {
				fn: () => {
					this.props.history.goBack();
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
		return {
			leftButton: {
				fn: () => {
					this.props.getUser(this.props.user.id);
					this.setState({
						disabled: true,
						buttons: this.view(),
					})
				},
				label: 'Cancelar'
			},
			rightButton: {
				fn: () => {
					this.props.update(this.props.user);
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
		tab: 1,
		disabled: true,
		buttons: this.view(),
	}

	handleChange = (event, tab) => {
		this.setState({ tab })
	};

	render() {
		const { user, setFirstName, setLastName, setNif, setEmail, setAlerts, setNewsletter,
			setPhone, setAddress, setPostCode, setCity, setCountry, setNotes } = this.props;

		return (
			<PartnerComponent
				partner={user}
				partnerActions={{
					setFirstName,
					setLastName,
					setNif,
					setEmail,
					setAlerts,
					setNewsletter,
					setPhone,
					setAddress,
					setPostCode,
					setCity,
					setCountry,
					setNotes
				}}
				tab={this.state.tab}
				handleChange={this.handleChange}
				disabled={this.state.disabled}
				buttons={this.state.buttons}
				profile
			/>
		);
	}
}

const mapStateToProps = state => ({
	user: state.user
});


const mapDispatchToProps = dispatch => ({
	setFirstName: firstName => dispatch(userAc.setFirstName(firstName)),
	setLastName: lastName => dispatch(userAc.setLastName(lastName)),
	setNif: nif => dispatch(userAc.setNif(nif)),
	setEmail: email => dispatch(userAc.setEmail(email)),
	setAlerts: alerts => dispatch(userAc.setAlerts(alerts)),
	setNewsletter: newsletter => dispatch(userAc.setNewsletter(newsletter)),
	setPhone: phone => dispatch(userAc.setPhone(phone)),
	setAddress: address => dispatch(userAc.setAddress(address)),
	setPostCode: postCode => dispatch(userAc.setPostCode(postCode)),
	setCity: city => dispatch(userAc.setCity(city)),
	setCountry: country => dispatch(userAc.setCountry(country)),
	setNotes: notes => dispatch(userAc.setNotes(notes)),
	update: body => dispatch(userAc.update(body)),
	getUser: id => dispatch(userAc.getUser(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
