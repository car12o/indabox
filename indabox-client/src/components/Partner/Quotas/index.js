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
		fontSize: '14px',
	},
	tableRowRed: {
		color: theme.palette.text.secondary,
	},
	lastCell: {
		paddingRight: '120px !important',
	}
});

class Quotas extends Component {
	render() {
		const { classes, data } = this.props;

		return (
			<Paper id="quotas-component" className={classes.root}>
				<Table>
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
								<TableCell classes={{ root: classNames(classes.tableRow, 
								{ [classes.tableRowRed]: !row.payment || (row.payment.status.value !== 1) }) }}
									component="th" scope="row" align="right" >
									{row.id}
								</TableCell>
								<TableCell classes={{ root: classNames(classes.tableRow, 
								{ [classes.tableRowRed]: !row.payment || (row.payment.status.value !== 1) }) }}
									align="right">{row.year}</TableCell>
								<TableCell classes={{ root: classNames(classes.tableRow, 
								{ [classes.tableRowRed]: !row.payment || (row.payment.status.value !== 1) }) }}
									align="right">{row.payment ? row.payment.status.label : ''}</TableCell>
								<TableCell classes={{ root: classNames(classes.tableRow, 
								{ [classes.tableRowRed]: !row.payment || (row.payment.status.value !== 1) }) }}
									align="right">{row.value}€</TableCell>
								<TableCell classes={{ root: classNames(classes.tableRow, 
								{ [classes.tableRowRed]: !row.payment || (row.payment.status.value !== 1) }) }}
									align="right">{row.invoiceEmitted ? 'Emitida' : 'Não emitida'}</TableCell>
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
