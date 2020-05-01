import React from "react"
import { times } from "lodash/fp"
import { makeStyles, TableBody as MatTableBody, TableRow, TableCell, Checkbox } from "@material-ui/core"
import { RowLoading } from "./RowLoading"
import { stableSort, getSorting } from "./helpers"

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

export const TableBody = ({
  data: _data,
  columns,
  orderBy,
  order,
  page,
  rowsPerPage,
  selectable,
  selected,
  onSelect,
  onRowClick,
  loading,
  rowLoadingHeight
}) => {
  const classes = useStyles()

  const data = orderBy && order
    ? stableSort(_data, getSorting(order, orderBy))
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    : _data

  return (
    <MatTableBody>
      {loading
        ? times(String, rowsPerPage).map((_, i) => (
          <RowLoading key={`key-${i}`} height={rowLoadingHeight || "49px"} />
        ))
        : data.map((n, i) => {
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
