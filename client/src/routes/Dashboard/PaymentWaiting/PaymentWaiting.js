import React, { useMemo } from "react"
import { formatDate } from "../../../services/transform"
import { Table } from "../../../components/Table"

const columns = [
  { id: "type", numeric: false, disablePadding: true, label: "Topo" },
  { id: "quotas", numeric: false, disablePadding: false, label: "Quotas" },
  { id: "status", numeric: false, disablePadding: false, label: "Estado" },
  { id: "value", numeric: false, disablePadding: false, label: "Total" },
  { id: "userFirstName", numeric: false, disablePadding: false, label: "Nome" },
  { id: "userLastName", numeric: false, disablePadding: false, label: "Apelido" },
  { id: "createdAt", numeric: false, disablePadding: false, label: "Data criação" }
]

export const PaymentWaiting = ({ payments, history }) => {
  const _payments = useMemo(() => payments
    .filter(({ paymentDate, deletedBy }) => !paymentDate && !deletedBy)
    .map(({ type, quotasYear, status, value, user, createdAt }) => ({
      type,
      status,
      quotas: quotasYear.join(","),
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
      orderBy="createdAt"
      order="desc"
      onRowClick={({ userId }) => history.push(`/partners/${userId}`)}
      rowsPerPage={8}
      rowsPerPageOptions={[8, 16, 24]}
      noDataLabel="Sem dados ..."
    />
  )
}
