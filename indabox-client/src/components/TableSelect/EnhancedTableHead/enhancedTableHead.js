import React from "react"
import { withStyles } from "@material-ui/core/styles"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"
import TableSortLabel from "@material-ui/core/TableSortLabel"
import Checkbox from "@material-ui/core/Checkbox"
import Tooltip from "@material-ui/core/Tooltip"

const styles = {
  tableHead: {
    backgroundImage: "linear-gradient(to right, #DA2155, #6000AC)",
    color: "white"
  },
  tableCell: {
    fontSize: "14px"
  },
  labelwhite: {
    color: "white !important"
  }
}

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property)
  }

  render() {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, rows } = this.props

    return (
      <TableHead classes={{ root: classes.tableHead }}>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              classes={{ root: classes.labelwhite }}
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {rows.map(
            row => (
              <TableCell
                classes={{ head: classes.tableCell }}
                key={row.id}
                align={row.numeric ? "right" : "left"}
                padding={row.disablePadding ? "none" : "default"}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? "bottom-end" : "bottom-start"}
                  enterDelay={300}
                >
                  <TableSortLabel
                    classes={{ root: classes.labelwhite }}
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            ),
            this,
          )}
        </TableRow>
      </TableHead>
    )
  }
}

export default withStyles(styles)(EnhancedTableHead)
