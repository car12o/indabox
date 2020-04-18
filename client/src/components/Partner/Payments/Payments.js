import React, { useState } from "react"
import { formatDate } from "../../../services/transform"
import { Table } from "../../Table/Table"
import { Invoice } from "../../Invoice"
import { PaymentsModal } from "./PaymentsModal"

const columns = [
  { id: "type", numeric: false, disablePadding: false, label: "TIPO" },
  { id: "quotas", numeric: false, disablePadding: false, label: "QUOTAS" },
  { id: "statusText", numeric: false, disablePadding: false, label: "ESTADO" },
  { id: "value", numeric: false, disablePadding: false, label: "TOTAL" },
  { id: "createdBy", numeric: false, disablePadding: false, label: "CRIADO POR" },
  { id: "createdAt", numeric: false, disablePadding: false, label: "DATA DE CRIAÇÃO" },
  { id: "invoice", numeric: false, disablePadding: false, label: "FATURA" }
]

export const Payments = ({ payments, paymentStatus, updatePaymentAndQuotas }) => {
  const [{ open, content }, setModalState] = useState({ open: false, content: {} })

  const data = payments.map((payment) => ({
    ...payment,
    quotas: payment.quotasYear.join(","),
    statusText: paymentStatus[payment.status],
    value: `${payment.value}€`,
    createdBy: (payment.createdBy && payment.createdBy.firstName) || "Importado",
    createdAt: formatDate(payment.createdAt),
    deletedAt: formatDate(payment.deletedAt),
    paymentDate: formatDate(payment.paymentDate),
    invoice: (
      <Invoice
        id={payment._id}
        status={payment.invoiceEmited}
        onPaymentUpdate={updatePaymentAndQuotas}
      />
    ),
    colored: ({ status }) => status === 20
  }))

  return (
    <>
      <Table
        columns={columns}
        data={data}
        order="desc"
        orderBy={"createdAt"}
        noDataLabel="Nao existem pagamentos ..."
        onRowClick={(payment) => setModalState({ open: true, content: payment })}
      />
      <PaymentsModal
        open={open}
        onClose={() => setModalState({ open: false, content: {} })}
        payment={content}
        updatePaymentAndQuotas={updatePaymentAndQuotas}
      />
    </>
  )
}

Payments.defaultProps = {
  payments: []
}
