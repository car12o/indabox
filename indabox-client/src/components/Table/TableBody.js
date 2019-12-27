import React from "react"
import { withStyles } from "@material-ui/core/styles"
import MatTableBody from "@material-ui/core/TableBody"
import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"
import Checkbox from "@material-ui/core/Checkbox"

const styles = {
  tableRow: {
    cursor: "pointer"
  }
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
}

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function getSorting(order, orderBy) {
  return order === "desc" ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy)
}

const TableBody = ({
  classes,
  rows,
  data,
  order,
  orderBy,
  page,
  rowsPerPage,
  selectable,
  selected,
  onSelect,
  onRowClick
}) => (<MatTableBody>
  {stableSort(data, getSorting(order, orderBy))
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((n) => {
      const isSelected = selected.includes(n.id)
      return (
        <TableRow
          classes={onRowClick && { root: classes.tableRow }}
          hover={!!onRowClick}
          onClick={() => onRowClick && onRowClick(n)}
          role="checkbox"
          aria-checked={isSelected}
          tabIndex={-1}
          key={n.id}
          selected={isSelected}
        >
          <TableCell padding="checkbox">
            {selectable && <Checkbox
              checked={isSelected}
              onClick={(e) => {
                onSelect(n.id, isSelected)
                e.stopPropagation()
              }}
            />}
          </TableCell>
          {rows.map((row, i) => {
            if (i === 0) {
              return (
                <TableCell key={i} component="th" scope="row" padding="none">
                  {n[row.id]}
                </TableCell>
              )
            }
            return (
              <TableCell key={i} align="right">{n[row.id]}</TableCell>
            )
          })}
        </TableRow>
      )
    })}
</MatTableBody>)

export default withStyles(styles)(TableBody)
