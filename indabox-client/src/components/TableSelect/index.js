import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import EnhancedTableHead from './EnhancedTableHead';
import EnhancedTableToolbar from './EnhancedTableToolbar';

function createData(id, number, firstName, lastName, debt, type) {
	return { id, number, firstName, lastName, debt, type };
}

function desc(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

function stableSort(array, cmp) {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = cmp(a[0], b[0]);
		if (order !== 0) return order;
		return a[1] - b[1];
	});
	return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
	return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const styles = theme => ({
	root: {
		width: '100%',
	},
	table: {
		minWidth: 1020,
	},
	tableWrapper: {
		overflowX: 'auto',
	},
	tableRow: {
		cursor: 'pointer',
	}
});

class Partners extends React.Component {
	state = {
		order: 'asc',
		orderBy: 'number',
		selected: [],
		data: [
			createData(1, 1, 'Joao', 'Cardoso', 120, 'Titular'),
			createData(2, 2, 'Ricardo', 'Ferreira', 120, 'Titular'),
			createData(3, 3, 'Andreia', 'Magalhaes', 120, 'Titular'),
			createData(4, 4, 'Diogo', 'Melo', 120, 'Titular'),
			createData(5, 5, 'Ricardo', 'Coelho', 120, 'Titular'),
			createData(6, 6, 'Miguel', 'Matos', 120, 'Titular'),
			createData(7, 7, 'Antonio', 'Castro', 120, 'Titular'),
			createData(10, 10, 'Helder', 'Pereira', 120, 'Titular'),
			createData(8, 8, 'Paulo', 'Goncalves', 120, 'Titular'),
			createData(9, 9, 'Lucas', 'Monteverde', 120, 'Titular'),
		],
		page: 0,
		rowsPerPage: 12,
	};

	handleRequestSort = (event, property) => {
		const orderBy = property;
		let order = 'desc';

		if (this.state.orderBy === property && this.state.order === 'desc') {
			order = 'asc';
		}

		this.setState({ order, orderBy });
	};

	handleSelectAllClick = event => {
		if (event.target.checked) {
			this.setState(state => ({ selected: state.data.map(n => n.number) }));
			return;
		}
		this.setState({ selected: [] });
	};

	handleClick = (event, id) => {
		const { selected } = this.state;
		const selectedIndex = selected.indexOf(id);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, id);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1),
			);
		}

		this.setState({ selected: newSelected });
		event.stopPropagation();
	};

	handleChangePage = (event, page) => {
		this.setState({ page });
	};

	handleChangeRowsPerPage = event => {
		this.setState({ rowsPerPage: event.target.value });
	};

	isSelected = id => this.state.selected.indexOf(id) !== -1;

	render() {
		const { classes, history } = this.props;
		const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
		const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

		return (
			<Paper className={classes.root}>
				<EnhancedTableToolbar numSelected={selected.length} />
				<div className={classes.tableWrapper}>
					<Table className={classes.table} aria-labelledby="tableTitle">
						<EnhancedTableHead
							numSelected={selected.length}
							order={order}
							orderBy={orderBy}
							onSelectAllClick={this.handleSelectAllClick}
							onRequestSort={this.handleRequestSort}
							rowCount={data.length}
						/>
						<TableBody>
							{stableSort(data, getSorting(order, orderBy))
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map(n => {
									const isSelected = this.isSelected(n.number);
									return (
										<TableRow className={classes.tableRow}
											hover
											onClick={() => history.push(`/partners/${n.id}`)}
											role="checkbox"
											aria-checked={isSelected}
											tabIndex={-1}
											key={n.id}
											selected={isSelected}
										>
											<TableCell padding="checkbox">
												<Checkbox checked={isSelected} onClick={event => this.handleClick(event, n.number)} />
											</TableCell>
											<TableCell align="right" padding="none">{n.number}</TableCell>
											<TableCell align="left" component="th" scope="row">{n.firstName}</TableCell>
											<TableCell align="left" component="th" scope="row">{n.lastName}</TableCell>
											<TableCell align="right">{n.debt}</TableCell>
											<TableCell align="left">{n.type}</TableCell>
										</TableRow>
									);
								})}
							{emptyRows > 0 && (
								<TableRow style={{ height: 49 * emptyRows }}>
									<TableCell colSpan={6} />
								</TableRow>
							)}
						</TableBody>
					</Table>
				</div>
				<TablePagination
					rowsPerPageOptions={[6, 12, 25]}
					labelRowsPerPage="Numero por pagina"
					component="div"
					count={data.length}
					rowsPerPage={rowsPerPage}
					page={page}
					backIconButtonProps={{
						'aria-label': 'Previous Page',
					}}
					nextIconButtonProps={{
						'aria-label': 'Next Page',
					}}
					onChangePage={this.handleChangePage}
					onChangeRowsPerPage={this.handleChangeRowsPerPage}
				/>
			</Paper>
		);
	}
}

export default connect()(withStyles(styles)(Partners));