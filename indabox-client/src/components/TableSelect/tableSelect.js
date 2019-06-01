import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import fp from 'lodash/fp';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import EnhancedTableHead from './EnhancedTableHead';
import EnhancedTableToolbar from './EnhancedTableToolbar';

function desc(a, b) {
	let cmpA = a;
	let cmpB = b;

	if (cmpB < cmpA) {
		return -1;
	}
	if (cmpB > cmpA) {
		return 1;
	}

	return 0;
}

function stableSort(array, cmp, path) {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = cmp(fp.getOr('0', path, a[0]), fp.getOr('0', path, b[0]));
		if (order !== 0) return order;
		return a[1] - b[1];
	});
	return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
	return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const styles = (theme) => ({
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
	},
	tableRowError: {
		color: `${theme.palette.primary.main} !important`,
	},
	tableCheckbox: {
		color: `${theme.palette.primary.main} !important`,
	},
});

class Partners extends React.Component {
	state = {
		selected: [],
		page: 0,
		rowsPerPage: 12,
	};

	handleRequestSort = (event, property) => {
		let orderBy = property;
		let order = this.state.order === 'desc' ? 'desc' : 'asc';

		if (this.state.orderBy === orderBy) {
			order = this.state.order === 'desc' ? 'asc' : 'desc'
		}

		this.setState({ order, orderBy });
	};

	handleSelectAllClick = event => {
		if (event.target.checked) {
			const selected = this.props.data.map(n => n.id)
			this.setState(() => ({ selected }));
			this.onSelect(selected);
			return;
		}
		this.setState({ selected: [] });
		this.onSelect([]);
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
		this.onSelect(newSelected);
		event.stopPropagation();
	};

	handleChangePage = (event, page) => {
		this.setState({ page });
	};

	handleChangeRowsPerPage = event => {
		this.setState({ rowsPerPage: event.target.value });
	};

	isSelected = id => this.state.selected.indexOf(id) !== -1;

	onSelect(selected) {
		if (this.props.onSelect) {
			this.props.onSelect(selected);
		}
	}

	render() {
		const { classes, data, onClick, rows, tableToolbarTitle, hover, rowsPerPageOptions } = this.props;
		const order = this.state.order || this.props.order || 'asc';
		const orderBy = this.state.orderBy || this.props.orderBy || 'number';


		const { selected, rowsPerPage, page } = this.state;
		const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

		return (
			<Paper className={classes.root}>
				{tableToolbarTitle
					? <EnhancedTableToolbar
						numSelected={selected.length}
						title={tableToolbarTitle}
					/>
					: ''}
				<div className={classes.tableWrapper}>
					<Table className={classes.table} aria-labelledby="tableTitle">
						<EnhancedTableHead
							rows={rows}
							numSelected={selected.length}
							order={order}
							orderBy={orderBy}
							onSelectAllClick={this.handleSelectAllClick}
							onRequestSort={this.handleRequestSort}
							rowCount={data.length}
						/>
						<TableBody>
							{stableSort(data, getSorting(order, orderBy), orderBy)
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map(n => {
									let error = false;
									const isSelected = this.isSelected(n.id);
									const row = rows.find(row => row.color);
									if (row) {
										error = fp.has(row.id, n) ? false : true;
									}

									return (
										<TableRow
											className={classNames({ [classes.tableRow]: hover })}
											hover={hover}
											onClick={() => onClick(n)}
											role="checkbox"
											aria-checked={isSelected}
											tabIndex={-1}
											key={n.id}
											selected={isSelected}
										>
											<TableCell padding="checkbox">
												<Checkbox
													classes={{ root: classes.tableCheckbox }}
													checked={isSelected}
													onClick={event => this.handleClick(event, n.id)}
												/>
											</TableCell>
											{rows.map((row, i) => (
												<TableCell
													key={i}
													align='left'
													className={classNames({ [classes.tableRowError]: error })}
												>
													{`${fp.getOr(row.default, row.id, n)}${row.symbol ? row.symbol : ''}`}
												</TableCell>
											))}
										</TableRow>
									)
								})
							}
							{emptyRows > 0 && (
								<TableRow style={{ height: 49 * emptyRows }}>
									<TableCell colSpan={6} />
								</TableRow>
							)}
						</TableBody>
					</Table>
				</div>
				<TablePagination
					rowsPerPageOptions={rowsPerPageOptions || [6, 12, 25]}
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