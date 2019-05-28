import React, { Component } from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Dropdown from '../../DropDown';
import PaymentModal from '../PaymentModal/paymentModal';
import './styles.css';

const styles = theme => ({
	root: {
		width: '100%',
		backgroundColor: 'transparent',
		overflowX: 'auto',
		boxShadow: 'none',
	},
	tableHead: {
		color: 'white',
		fontSize: '14px',
	},
	tableRow: {
		'&:hover': {
			cursor: 'pointer',
			backgroundColor: 'rgba(0, 0, 0, 0.07)',
		},
	},
	lastCell: {
		paddingRight: '120px !important',
	}
});

class Quotas extends Component {
	state = {
		modalOpen: false,
	};

	render() {
		const { classes, data } = this.props;

		return (
			<Paper id="quotas-component" className={classes.root}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell classes={{ root: classes.tableHead }} align="right">TIPO</TableCell>
							<TableCell classes={{ root: classes.tableHead }} align="right">CRIADO POR</TableCell>
							<TableCell classes={{ root: classes.tableHead }} align="right">QUOTAS</TableCell>
							<TableCell classes={{ root: classes.tableHead }} align="right">ESTADO</TableCell>
							<TableCell classes={{ root: classes.tableHead }} align="right">TOTAL</TableCell>
							<TableCell classes={{ root: classNames(classes.tableHead, classes.lastCell) }} align="right">FACTURA</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data.map((row, i) => (
							<TableRow key={i} className={classes.tableRow} onClick={() => this.setState({ modalOpen: true })}>
								<TableCell component="th" scope="row" align="right" >
									{row.type}
								</TableCell>
								<TableCell align="right">{row.createdBy || 'Ficheiro'}</TableCell>
								<TableCell align="right">{row.quotas}</TableCell>
								<TableCell align="right">{row.status.label}</TableCell>
								<TableCell align="right">{row.value}€</TableCell>
								<TableCell className={classes.lastCell} align="right" onClick={e => e.stopPropagation()}>
									<Dropdown
										inputClasses={{ fontSize: '13px' }}
										value="Não emitida"
										options={[
											{ label: 'Emitida', value: 'Emitida' },
											{ label: 'Não emitida', value: 'Não emitida' },
										]}
										variant="standard"
									/>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
				<PaymentModal
					open={this.state.modalOpen}
					onClose={() => this.setState({ modalOpen: false })}
				/>
			</Paper>
		);
	}
}

export default withStyles(styles)(Quotas);
