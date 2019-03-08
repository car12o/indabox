import React, { Component } from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import PlayCircleFilled from '@material-ui/icons/PlayCircleFilled';
import './styles.css';

const styles = {
	root: {
		width: '100%',
		backgroundColor: 'transparent',
		overflowX: 'auto',
		boxShadow: 'none',
	},
	table: {
		minWidth: 700,
	},
	tableHead: {
		color: 'white',
		fontSize: '14px',
	},
	lastCell: {
		paddingRight: '120px !important',
	}
};

class Quotas extends Component {
	render() {
		const { classes, data } = this.props;

		return (
			<Paper id="quotas-component" className={classes.root}>
				<Table className={classes.table}>
					<TableHead>
						<TableRow>
							<TableCell classes={{ root: classes.tableHead }} align="right">ID</TableCell>
							<TableCell classes={{ root: classes.tableHead }} align="right">ANO</TableCell>
							<TableCell classes={{ root: classes.tableHead }} align="right">ESTADO</TableCell>
							<TableCell classes={{ root: classes.tableHead }} align="right">VALOR</TableCell>
							<TableCell classes={{ root: classes.tableHead }} align="right">FACTURA EMITIDA</TableCell>
							<TableCell classes={{ root: classNames(classes.tableHead, classes.lastCell) }} align="right"></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data.map(row => (
							<TableRow key={row.id}>
								<TableCell component="th" scope="row" align="right">
									{row.id}
								</TableCell>
								<TableCell align="right">{row.year}</TableCell>
								<TableCell align="right">{row.state}</TableCell>
								<TableCell align="right">{row.value.label}</TableCell>
								<TableCell align="right">{row.invoiceEmitted ? 'Emitida' : 'Nao emitida'}</TableCell>
								<TableCell classes={{ root: classes.lastCell }} align="right"><PlayCircleFilled /></TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</Paper>
		);
	}
}

export default withStyles(styles)(Quotas);
