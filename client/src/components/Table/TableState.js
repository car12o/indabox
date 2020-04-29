import React, { useState, useCallback } from "react"
import { compose } from "lodash/fp"
import { makeStyles, Typography, Table as MatTable, TablePagination } from "@material-ui/core"
import { TableHead } from "./TableHead"
import { TableBody } from "./TableBody"
import { TableActions } from "./TableActions"
import { handleRequestSort, handleSelectAllClick, handleSelectClick } from "./helpers"

const useStyles = makeStyles({
  root: {
    position: "relative"
  },
  subtitle: {
    padding: "15px"
  }
})

const initState = (props) => ({
  orderBy: props.orderBy || "id",
  order: props.order || "asc",
  page: props.page || 0,
  rowsPerPage: props.rowsPerPage || 15,
  selected: []
})

export const TableState = ({ data = [], columns, onRowClick, actions, noDataLabel, ...props }) => {
  const [{ orderBy, order, page, rowsPerPage, selected }, setter] = compose(
    useState,
    initState
  )(props)
  const setState = useCallback((values) => setter((state) => ({ ...state, ...values })), [setter])
  const rowsPerPageOptions = props.rowsPerPageOptions || [15, 30, 50]
  const classes = useStyles()

  if (data.length === 0) {
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
          onRequestSort={handleRequestSort({ order, orderBy, setState })}
          numSelected={selected.length}
          selectable={actions}
          onSelectAll={handleSelectAllClick({ data, selected, setState })}
        />
        <TableBody
          data={data}
          columns={columns}
          order={order}
          orderBy={orderBy}
          page={page}
          rowsPerPage={rowsPerPage}
          selectable={actions}
          selected={selected}
          onSelect={handleSelectClick({ selected, setState })}
          onRowClick={onRowClick}
        />
      </MatTable>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{ "aria-label": "Previous Page" }}
        nextIconButtonProps={{ "aria-label": "Next Page" }}
        onChangePage={(_, page) => setState({ page })}
        onChangeRowsPerPage={({ target: { value: rowsPerPage } }) => setState({ rowsPerPage })}
      />
      {actions && <TableActions
        actions={actions}
        selected={selected}
        setSelected={() => setState({ selected: [] })}
      />}
    </>
  )
}
