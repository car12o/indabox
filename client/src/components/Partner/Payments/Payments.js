import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { formatDate } from "../../../services/transform"
import { useApi } from "../../../services/api"
import { Table } from "../../Table/Table"
import { Dropdown } from "../../Dropdown/Dropdown"
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

const useStyles = makeStyles({
  invoice: {
    width: "auto",
    maxHeight: "26px",
    marginBottom: 0,
    "&::before": {
      borderBottom: 0
    }
  },
  input: {
    fontSize: "13px",
    "&::before": {
      borderBottom: 0
    }
  }
})

const Invoice = ({ id, status, updatePaymentAndQuotas }) => {
  const classes = useStyles()
  const api = useApi()

  const update = async (invoiceEmited) => {
    const { body: payment } = await api.put(`/payments/${id}`, { invoiceEmited })
    updatePaymentAndQuotas({ payment })
  }

  return (
    <Dropdown
      classes={{ formControl: classes.invoice, input: classes.input }}
      value={status}
      onChange={(value) => update(value)}
      options={[
        { label: "Emitida", value: true },
        { label: "Não emitida", value: false }
      ]}
    />
  )
}

export const Payments = ({ payments, paymentStatus, updatePaymentAndQuotas }) => {
  const [{ open, content }, setModalState] = useState({ open: false, content: {} })
  const classes = useStyles()

  const data = payments.map((payment) => ({
    ...payment,
    quotas: payment.quotasYear.join(","),
    statusText: paymentStatus[payment.status],
    value: `${payment.value}€`,
    createdBy: payment.createdBy.firstName,
    createdAt: formatDate(payment.createdAt),
    deletedAt: formatDate(payment.deletedAt),
    paymentDate: formatDate(payment.paymentDate),
    invoice: (
      <Invoice
        classes={classes}
        id={payment._id}
        status={payment.invoiceEmited}
        updatePaymentAndQuotas={updatePaymentAndQuotas}
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
