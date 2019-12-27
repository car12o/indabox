import React, { useState } from "react"
import { withStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import MatTable from "@material-ui/core/Table"
import TablePagination from "@material-ui/core/TablePagination"
import TableHead from "./TableHead"
import TableBody from "./TableBody"
import TableActions from "./TableActions"

const styles = {
  subtitle: {
    padding: "15px"
  }
}

function handleRequestSort(order, orderBy, { setOrder, setOrderBy }) {
  return (_orderBy) => () => {
    if (orderBy === _orderBy) {
      setOrder(order === "asc" ? "desc" : "asc")
      return
    }

    setOrderBy(_orderBy)
    setOrder("asc")
  }
}

function handleSelectAllClick(data, selected, { setSelected }) {
  return () => {
    if (data.length === selected.length) {
      setSelected([])
      return
    }

    setSelected(data.map(({ id }) => id))
  }
}

function handleSelectClick(selected, { setSelected }) {
  return (id, isSelected) => {
    if (isSelected) {
      setSelected(selected.filter((_id) => _id !== id))
      return
    }

    const _selected = [...selected, id]
    setSelected(_selected)
  }
}

const Table = ({
  classes,
  rows,
  order,
  orderBy,
  data,
  page,
  rowsPerPage,
  rowsPerPageOptions,
  onRowClick,
  actions,
  noDataLabel
}) => {
  const [_order, setOrder] = useState(order || "asc")
  const [_orderBy, setOrderBy] = useState(orderBy)
  const [_page, setPage] = useState(page || 0)
  const [_rowsPerPage, setRowsPerPage] = useState(rowsPerPage || 10)
  const [selected, setSelected] = useState([])

  const _rowsPerPageOptions = rowsPerPageOptions || [10, 20, 50]

  if (data.length === 0) {
    return (
      <Typography classes={{ root: classes.subtitle }} variant="subtitle1">
        {noDataLabel}
      </Typography>
    )
  }

  return (
    <div>
      <MatTable aria-labelledby="tableTitle">
        <TableHead
          rows={rows}
          rowCount={data.length}
          order={_order}
          orderBy={_orderBy}
          onRequestSort={handleRequestSort(_order, _orderBy, { setOrder, setOrderBy })}
          numSelected={selected.length}
          selectable={actions}
          onleSelectAll={handleSelectAllClick(data, selected, { setSelected })}
        />
        <TableBody
          rows={rows}
          data={data}
          order={_order}
          orderBy={_orderBy}
          page={_page}
          rowsPerPage={_rowsPerPage}
          selectable={actions}
          selected={selected}
          onSelect={handleSelectClick(selected, { setSelected })}
          onRowClick={onRowClick}
        />
      </MatTable>
      <TablePagination
        rowsPerPageOptions={_rowsPerPageOptions}
        component="div"
        count={data.length}
        rowsPerPage={_rowsPerPage}
        page={_page}
        backIconButtonProps={{ "aria-label": "Previous Page" }}
        nextIconButtonProps={{ "aria-label": "Next Page" }}
        onChangePage={(_, n) => setPage(n)}
        onChangeRowsPerPage={({ target }) => setRowsPerPage(target.value)}
      />
      {actions && <TableActions
        actions={actions}
        selected={selected}
      />}
    </div>
  )
}

export default withStyles(styles)(Table)
