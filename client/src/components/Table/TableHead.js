import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { TableHead as MatTableHead, TableRow, TableCell, TableSortLabel, Checkbox, Tooltip } from "@material-ui/core"
import { ArrowDownward } from "@material-ui/icons"

const useStyles = makeStyles({
  cell: {
    color: "white",
    fontWeight: "bold",
    textTransform: "uppercase",
    whiteSpace: "nowrap",
    overflow: "hidden"
  },
  padStart: {
    paddingLeft: "35px"
  },
  padStartCheckbox: {
    paddingLeft: "20px"
  }
})

export const TableHead = ({
  data,
  columns,
  order,
  orderBy,
  onRequestSort,
  selectable,
  numSelected,
  onSelectAll
}) => {
  const classes = useStyles()

  return (
    <MatTableHead classes={{ root: "gradient-background" }}>
      <TableRow classes={{ root: classes.row }}>
        {selectable && (
          <TableCell padding="checkbox">
            <Checkbox
              classes={{ root: `${classes.cell} ${classes.padStartCheckbox}` }}
              checked={numSelected === data.filter((n) => n.selectable(n)).length}
              onChange={onSelectAll}
            />
          </TableCell>)
        }
        {columns.map((row) => (
          <TableCell
            key={row.id}
            classes={{ root: `${classes.cell} ${!selectable && classes.padStart}` }}
            style={{ width: row.width || "auto" }}
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
                style={{ color: "white" }}
                active={orderBy === row.id}
                direction={order}
                onClick={onRequestSort(row.id)}
                IconComponent={({ className }) => (
                  <ArrowDownward className={className} style={{ color: "white" }} />
                )}
              >
                {row.label}
              </TableSortLabel>
            </Tooltip>
          </TableCell>
        ))}
      </TableRow>
    </MatTableHead>
  )
}
