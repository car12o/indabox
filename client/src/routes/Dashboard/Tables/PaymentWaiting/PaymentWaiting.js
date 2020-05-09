import React, { useMemo } from "react"
import { formatDate } from "../../../../services/transform"
import { Table } from "../../../../components/Table"
import { QuotasYear } from "../../../../components/QuotasYear"

const columns = [
  { id: "type", numeric: false, disablePadding: true, label: "Topo" },
  { id: "quotas", numeric: false, disablePadding: false, label: "Quotas" },
  { id: "status", numeric: false, disablePadding: false, label: "Estado" },
  { id: "value", numeric: false, disablePadding: false, label: "Total" },
  { id: "userFirstName", numeric: false, disablePadding: false, label: "Nome" },
  { id: "userLastName", numeric: false, disablePadding: false, label: "Apelido" },
  { id: "createdAt", numeric: false, disablePadding: false, label: "Data criação" }
]

export const PaymentWaiting = ({
  payments,
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
  const _payments = useMemo(() => payments
    .map(({ type, quotasYear, status, value, user, createdAt }) => ({
      type,
      status,
      quotas: <QuotasYear data={quotasYear} />,
      value: `${value}€`,
      userId: user._id,
      userFirstName: user.firstName,
      userLastName: user.lastName,
      createdAt: formatDate(createdAt)
    })), [payments])

  return (
    <Table
      columns={columns}
      data={_payments}
      orderBy={orderBy}
      order={order}
      onRequestSort={onRequestSort}
      onRowClick={({ userId }) => history.push(`/partners/${userId}`)}
      count={count}
      page={(_payments.length > 0 && page) || 0}
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
