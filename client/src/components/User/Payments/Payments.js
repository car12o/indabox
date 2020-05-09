import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { formatDate } from "../../../services/transform"
import { Table } from "../../Table"
import { Invoice } from "../../Invoice"
import { PaymentsModal } from "./PaymentsModal"
import { QuotasYear } from "../../QuotasYear"

const useStyles = makeStyles({
  root: {
    position: "relative"
  }
})

const columns = [
  { id: "type", numeric: false, disablePadding: false, label: "TIPO" },
  { id: "quotas", numeric: false, disablePadding: false, label: "QUOTAS" },
  { id: "statusText", numeric: false, disablePadding: false, label: "ESTADO" },
  { id: "value", numeric: false, disablePadding: false, label: "TOTAL" },
  { id: "createdBy", numeric: false, disablePadding: false, label: "CRIADO POR" },
  { id: "createdAt", numeric: false, disablePadding: false, label: "DATA DE CRIAÇÃO" },
  { id: "invoice", numeric: false, disablePadding: false, label: "FATURA" }
]

export const Payments = ({ payments, paymentStatus, updatePaymentAndQuotas, inactive, blur }) => {
  const [{ open, content }, setModalState] = useState({ open: false, content: {} })
  const classes = useStyles()

  const data = payments.map((payment) => ({
    ...payment,
    quotas: <QuotasYear data={payment.quotasYear} />,
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
    <div className={classes.root}>
      {blur && <div className="blur-content"></div>}
      <Table
        columns={columns}
        data={data}
        order="desc"
        orderBy={"createdAt"}
        noDataLabel="Nao existem pagamentos ..."
        onRowClick={!inactive
          ? ((payment) => setModalState({ open: true, content: payment }))
          : null
        }
      />
      <PaymentsModal
        open={open}
        onClose={() => setModalState({ open: false, content: {} })}
        payment={content}
        updatePaymentAndQuotas={updatePaymentAndQuotas}
      />
    </div>
  )
}

Payments.defaultProps = {
  payments: []
}
