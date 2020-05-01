import React from "react"
import { formatDate } from "../../../../services/transform"
import { Table } from "../../../../components/Table"

const columns = [
  { id: "year", numeric: false, disablePadding: true, label: "Ano" },
  { id: "userFirstName", numeric: false, disablePadding: false, label: "Nome" },
  { id: "userLastName", numeric: false, disablePadding: false, label: "Apelido" },
  { id: "createdAt", numeric: false, disablePadding: false, label: "Data criacão" }
]

export const PaymentMissing = ({
  quotas,
  count,
  orderBy,
  order,
  page,
  limit,
  history,
  loading,
  fetchData,
  onRequestSort
}) => {
  const _quotas = quotas.map(({ user, createdAt, ...quota }) => ({
    ...quota,
    userId: user._id,
    userFirstName: user.firstName,
    userLastName: user.lastName,
    createdAt: formatDate(createdAt)
  }))

  return (
    <Table
      columns={columns}
      data={_quotas}
      orderBy={orderBy}
      order={order}
      onRequestSort={onRequestSort}
      onRowClick={({ userId }) => history.push(`/partners/${userId}`)}
      count={count}
      page={(_quotas.length > 0 && page) || 0}
      onChangePage={(_, page) => fetchData({ page })}
      rowsPerPage={limit}
      rowsPerPageOptions={[8, 16, 24]}
      onChangeRowsPerPage={({ target: { value: limit } }) => fetchData({ limit })}
      noDataLabel="Sem dados ..."
      loading={loading}
      dynamic
    />
  )
}
