import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { TableBody as MatTableBody, TableRow, TableCell, Checkbox } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  tableRow: {
    cursor: "pointer"
  },
  padStart: {
    paddingLeft: "35px"
  },
  padStartCheckbox: {
    paddingLeft: "20px"
  },
  tableRowHighlight: {
    color: theme.palette.primary.main
  }
}))

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

export const TableBody = ({
  columns,
  data,
  order,
  orderBy,
  page,
  rowsPerPage,
  selectable,
  selected,
  onSelect,
  onRowClick
}) => {
  const classes = useStyles()

  return (
    <MatTableBody>
      {stableSort(data, getSorting(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((n, i) => {
          const isSelected = selected.includes(n.id)
          return (
            <TableRow
              key={`tableRow-${i}`}
              classes={onRowClick && { root: classes.tableRow }}
              hover={!!onRowClick}
              onClick={() => onRowClick && onRowClick(n)}
              role="checkbox"
              aria-checked={isSelected}
              tabIndex={-1}
              selected={isSelected}
            >
              {selectable && (
                <TableCell padding="checkbox">
                  {n.selectable(n) && (
                    <Checkbox
                      classes={{ root: classes.padStartCheckbox }}
                      checked={isSelected}
                      onClick={(e) => {
                        onSelect(n.id, isSelected)
                        e.stopPropagation()
                      }}
                    />)}
                </TableCell>)}
              {columns.map((row, z) => (
                <TableCell
                  key={`tableCell-${z}`}
                  classes={n.colored && n.colored(n)
                    ? { root: `${!selectable && classes.padStart} ${classes.tableRowHighlight}` }
                    : { root: !selectable && classes.padStart }
                  }
                >
                  {n[row.id]}
                </TableCell>
              ))}
            </TableRow>
          )
        })}
    </MatTableBody>
  )
}
