import React, { useState } from "react"
import { makeStyles, Typography, Table as MatTable, TablePagination } from "@material-ui/core"
import { TableHead } from "./TableHead"
import { TableBody } from "./TableBody"
import { TableActions } from "./TableActions"
import { handleSelectAllClick, handleSelectClick } from "./helpers"

const useStyles = makeStyles({
  root: {
    position: "relative"
  },
  subtitle: {
    padding: "15px"
  }
})

export const TableDynamic = ({
  data = [],
  columns,
  orderBy,
  order,
  page,
  onRowClick,
  actions,
  noDataLabel,
  onRequestSort,
  count,
  onChangePage,
  onChangeRowsPerPage,
  loading,
  ...props
}) => {
  const [{ selected }, setState] = useState({ selected: [] })
  const rowsPerPage = props.rowsPerPage || 15
  const rowsPerPageOptions = props.rowsPerPageOptions || [15, 30, 50]
  const classes = useStyles()

  if (!loading && data.length === 0) {
    return (
      <Typography classes={{ root: classes.subtitle }} variant="subtitle1">
        {noDataLabel}
      </Typography>
    )
  }

  return (
    <>
      <MatTable classes={{ root: classes.root }} aria-labelledby="tableTitle">
        <TableHead
          data={data}
          columns={columns}
          order={order}
          orderBy={orderBy}
          onRequestSort={onRequestSort}
          numSelected={selected.length}
          selectable={actions}
          onSelectAll={handleSelectAllClick({ data, selected, setState })}
        />
        <TableBody
          data={data}
          columns={columns}
          order={order}
          orderBy={orderBy}
          page={0}
          rowsPerPage={rowsPerPage}
          selectable={actions}
          selected={selected}
          onSelect={handleSelectClick({ selected, setState })}
          onRowClick={onRowClick}
          loading={loading}
        />
      </MatTable>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{ "aria-label": "Previous Page" }}
        nextIconButtonProps={{ "aria-label": "Next Page" }}
        onChangePage={onChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
      />
      {actions && <TableActions
        actions={actions}
        selected={selected}
        setSelected={() => setState({ selected: [] })}
      />}
    </>
  )
}
