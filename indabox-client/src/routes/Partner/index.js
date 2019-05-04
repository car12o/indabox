import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash/fp';
import { partnersAc } from '../../store/actions';
import PartnerComponent from '../../components/Partner';

class Partner extends Component {
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
					this.props.getPartner(this.props.partners.selected.id);
					this.setState({
						disabled: true,
						buttons: this.view(),
					})
				},
				label: 'Cancelar'
			},
			rightButton: {
				fn: () => {
					this.props.update(this.props.partners.selected);
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
		const { partners, setFirstName, setLastName, setNif, setEmail, setAlerts, setNewsletter,
			setPhone, setType, setAddress, setPostCode, setCity, setCountry, setNotes } = this.props;

		return (
			<PartnerComponent
				partner={partners.selected}
				partnerActions={{
					setFirstName,
					setLastName,
					setNif,
					setEmail,
					setAlerts,
					setNewsletter,
					setPhone,
					setType,
					setAddress,
					setPostCode,
					setCity,
					setCountry,
					setNotes,
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
	setLastName: lastName => dispatch(partnersAc.setLastName(lastName)),
	setNif: nif => dispatch(partnersAc.setNif(nif)),
	setEmail: email => dispatch(partnersAc.setEmail(email)),
	setAlerts: alerts => dispatch(partnersAc.setAlerts(alerts)),
	setNewsletter: newsletter => dispatch(partnersAc.setNewsletter(newsletter)),
	setPhone: phone => dispatch(partnersAc.setPhone(phone)),
	setType: type => dispatch(partnersAc.setType(type)),
	setAddress: address => dispatch(partnersAc.setAddress(address)),
	setPostCode: postCode => dispatch(partnersAc.setPostCode(postCode)),
	setCity: city => dispatch(partnersAc.setCity(city)),
	setCountry: country => dispatch(partnersAc.setCountry(country)),
	setNotes: notes => dispatch(partnersAc.setNotes(notes)),
	update: body => dispatch(partnersAc.update(body))
});

export default connect(mapStateToProps, mapDispatchToProps)(Partner);
