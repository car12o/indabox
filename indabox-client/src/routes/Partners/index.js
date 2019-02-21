import React from 'react';
import { connect } from 'react-redux';
import TableSelect from '../../components/TableSelect';
import { partnersAc } from '../../store/actions';

class Partners extends React.Component {
	render() {
		const { history, partners, setPartner } = this.props;
		const onClick = n => setPartner(n.id, history);

		const rows = [
			{ id: 'number', numeric: false, disablePadding: true, label: 'Nº de sócio' },
			{ id: 'firstName', numeric: false, disablePadding: false, label: 'Nome' },
			{ id: 'lastName', numeric: false, disablePadding: false, label: 'Apelido' },
			{ id: 'nif', numeric: false, disablePadding: false, label: 'NIF' },
			{ id: 'email', numeric: false, disablePadding: false, label: 'Endereço de email' },
			{ id: 'type', numeric: false, disablePadding: false, label: 'Tipo de sócio' },
		];

		return (
			<TableSelect
				rows={rows}
				data={partners.data}
				onClick={onClick}
			/>
		);
	}
}

const mapStateToProps = state => ({
	partners: state.partners
});

const mapDispatchToProps = dispatch => ({
	setPartner: (id, history) => dispatch(partnersAc.setSelected(id, history)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Partners);