import React from 'react';
import { connect } from 'react-redux';
// import { withStyles } from '@material-ui/core/styles';
import TableSelect from '../../components/TableSelect';

class Partners extends React.Component {
	render() {
		const { history } = this.props;

		return (
			<TableSelect history={history} />
		);
	}
}

export default connect()(Partners);