import React from 'react';
import { connect } from 'react-redux';
import LinearProgress from '@material-ui/core/LinearProgress';
import { getPartners } from '../../store/actions/partners';
import TableSelect from '../../components/TableSelect/tableSelect';

class Partners extends React.Component {
	async componentWillMount() {
		this.setState({ loading: true });
		await this.props.getPartners();
		this.setState({ loading: false });
	}

	state = {
		loading: false,
	};

	render() {
		if (this.state.loading) {
			return (<LinearProgress />);
		}

		const { history, partners } = this.props;

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
				onClick={n => history.push(`/partners/${n.id}`)}
				order="desc"
				orderBy="number.value"
				hover
			/>
		);
	}
}

const mapStateToProps = state => ({
	partners: state.partners,
});

const mapDispatchToProps = dispatch => ({
	getPartners: () => dispatch(getPartners()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Partners);