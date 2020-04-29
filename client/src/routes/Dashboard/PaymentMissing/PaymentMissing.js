import React from "react"
import { formatDate } from "../../../services/transform"
import { Table } from "../../../components/Table"

const columns = [
  { id: "year", numeric: false, disablePadding: true, label: "Ano" },
  { id: "userFirstName", numeric: false, disablePadding: false, label: "Nome" },
  { id: "userLastName", numeric: false, disablePadding: false, label: "Apelido" },
  { id: "createdAt", numeric: false, disablePadding: false, label: "Data criacão" }
]

export const PaymentMissing = ({ quotas, history }) => {
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
      orderBy="createdAt"
      order="desc"
      onRowClick={({ userId }) => history.push(`/partners/${userId}`)}
      rowsPerPage={8}
      rowsPerPageOptions={[8, 16, 24]}
      noDataLabel="Sem dados ..."
    />
  )
}
