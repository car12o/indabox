import React from "react"
import { withStyles } from "@material-ui/core/styles"
import MatTableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"
import TableSortLabel from "@material-ui/core/TableSortLabel"
import Checkbox from "@material-ui/core/Checkbox"
import Tooltip from "@material-ui/core/Tooltip"

const styles = {
  cell: {
    color: "white",
    fontWeight: "bold",
    textTransform: "uppercase"
  },
  sortLabel: {
    color: "white",
    "&:hover": {
      color: "white"
    },
    "&:focus": {
      color: "white"
    }
  }
}

const TableHead = ({
  classes,
  rows,
  rowCount,
  order,
  orderBy,
  onRequestSort,
  selectable,
  numSelected,
  onleSelectAll
}) => (<MatTableHead classes={{ root: "gradient-background" }}>
  <TableRow classes={{ root: classes.row }}>
    <TableCell style={{ width: selectable ? "8%" : 0 }} padding="checkbox">
      {selectable && <Checkbox
        classes={{ root: classes.cell }}
        checked={numSelected === rowCount}
        onChange={onleSelectAll}
      />}
    </TableCell>
    {rows.map(
      (row) => (
        <TableCell
          key={row.id}
          classes={{ root: classes.cell }}
          style={{ width: row.width }}
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
              classes={{ root: classes.sortLabel }}
              active={orderBy === row.id}
              direction={order}
              onClick={onRequestSort(row.id)}
            >
              {row.label}
            </TableSortLabel>
          </Tooltip>
        </TableCell>
      ),
      this
    )}
  </TableRow>
</MatTableHead>)

export default withStyles(styles)(TableHead)
