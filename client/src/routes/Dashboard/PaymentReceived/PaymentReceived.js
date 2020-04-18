import React, { useMemo } from "react"
import { formatDate } from "../../../services/transform"
import { Table } from "../../../components/Table/Table"
import { Invoice } from "../../../components/Invoice"
import { paymentStatus } from "../../../constants"

const columns = [
  { id: "type", numeric: false, disablePadding: true, label: "Topo" },
  { id: "quotas", numeric: false, disablePadding: false, label: "Quotas" },
  { id: "status", numeric: false, disablePadding: false, label: "Estado" },
  { id: "value", numeric: false, disablePadding: false, label: "Total" },
  { id: "userFirstName", numeric: false, disablePadding: false, label: "Nome" },
  { id: "userLastName", numeric: false, disablePadding: false, label: "Apelido" },
  { id: "paymentDate", numeric: false, disablePadding: false, label: "Data pagamento" },
  { id: "invoice", numeric: false, disablePadding: false, label: "Fatura" }
]

export const PaymentReceived = ({ payments, onPaymentUpdate, history }) => {
  const _payments = useMemo(() => payments
    .filter(({ paymentDate, deletedBy }) => paymentDate && !deletedBy)
    .map(({ _id, type, quotasYear, status, value, user, paymentDate, invoiceEmited }) => ({
      type,
      status: paymentStatus[status],
      quotas: quotasYear.join(","),
      value: `${value}€`,
      userId: user._id,
      userFirstName: user.firstName,
      userLastName: user.lastName,
      paymentDate: formatDate(paymentDate),
      invoice: (
        <Invoice
          id={_id}
          status={invoiceEmited}
          onPaymentUpdate={onPaymentUpdate}
        />
      )
    })), [payments])

  return (
    <Table
      columns={columns}
      data={_payments}
      orderBy="paymentDate"
      order="desc"
      onRowClick={({ userId }) => history.push(`/partners/${userId}`)}
      rowsPerPage={8}
      rowsPerPageOptions={[8, 16, 24]}
      noDataLabel="Sem dados ..."
    />
  )
}
