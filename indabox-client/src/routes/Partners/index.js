import React from 'react';
import { connect } from 'react-redux';
import TableSelect from '../../components/TableSelect';
import { partnersAc } from '../../store/actions';

class Partners extends React.Component {
	componentWillMount() {
		this.props.getPartners();
	}

	render() {
		const { history, partners, setPartner } = this.props;
		const onClick = n => setPartner(n.id, history);

		const rows = [
			{ id: 'number', numeric: false, disablePadding: true, label: 'Nº de sócio' },
			{ id: 'firstName.value', numeric: false, disablePadding: false, label: 'Nome' },
			{ id: 'lastName.value', numeric: false, disablePadding: false, label: 'Apelido' },
			{ id: 'nif.value', numeric: false, disablePadding: false, label: 'NIF' },
			{ id: 'email.value', numeric: false, disablePadding: false, label: 'Endereço de email' },
			{ id: 'type.value', numeric: false, disablePadding: false, label: 'Tipo de sócio' },
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
	getPartners: () => dispatch(partnersAc.getPartners()),
	setPartner: (id, history) => dispatch(partnersAc.setSelected(id, history)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Partners);