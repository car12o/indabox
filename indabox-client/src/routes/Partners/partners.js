import React from 'react';
import { connect } from 'react-redux';
import { getPartners } from '../../store/actions/partners';
import TableSelect from '../../components/TableSelect';

class Partners extends React.Component {
	componentWillMount() {
		this.props.getPartners();
	}

	render() {
		const { history, partners, setPartner } = this.props;
		const onClick = n => setPartner(n.id, history);

		console.log(partners);

		const rows = [
			{ id: 'number.value', numeric: false, disablePadding: true, label: 'Nº de sócio' },
			{ id: 'firstName.value', numeric: false, disablePadding: false, label: 'Nome' },
			{ id: 'lastName.value', numeric: false, disablePadding: false, label: 'Apelido' },
			{ id: 'nif.value', numeric: false, disablePadding: false, label: 'NIF' },
			{ id: 'email.value', numeric: false, disablePadding: false, label: 'Endereço de email' },
			{ id: 'role.value.label', numeric: false, disablePadding: false, label: 'Tipo de sócio' },
		];

		return (
			<TableSelect
				tableToolbarTitle="Sócios"
				rows={rows}
				data={partners.list}
				onClick={onClick}
				hover
			/>
		);
	}
}

const mapStateToProps = state => ({
	partners: state.partners
});

const mapDispatchToProps = dispatch => ({
	getPartners: () => dispatch(getPartners()),
	// setPartner: (id, history) => dispatch(partnersAc.setSelected(id, history)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Partners);