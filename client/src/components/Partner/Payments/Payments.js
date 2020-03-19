import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { formatDate } from "../../../services/transform"
import { patch } from "../../../services/api"
import { Table } from "../../Table/Table"
import { Dropdown } from "../../Dropdown/Dropdown"
import { PaymentsModal } from "./PaymentsModal"

const columns = [
  { id: "type", numeric: false, disablePadding: false, label: "TIPO" },
  { id: "quotas", numeric: false, disablePadding: false, label: "QUOTAS" },
  { id: "status", numeric: false, disablePadding: false, label: "ESTADO" },
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

const parseQuotas = (quotas) => quotas.reduce((accm, { year }) => {
  if (!accm) {
    return year
  }
  return `${accm},${year}`
}, "")

const Invoice = ({ id, status, updatePayment }) => {
  const classes = useStyles()

  const update = async (invoiceEmited) => {
    const { body } = await patch(`/payments/invoice/${id}`, { invoiceEmited })
    updatePayment(body)
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

export const Payments = ({ payments, updateUser, updatePayment }) => {
  const [{ open, content }, setModalState] = useState({ open: false, content: {} })
  const classes = useStyles()

  const data = payments.map((payment) => ({
    ...payment,
    quotas: parseQuotas(payment.quotas),
    status: payment.status.label,
    statusValue: payment.status.value,
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
        updatePayment={updatePayment}
      />
    ),
    colored: ({ statusValue }) => statusValue === 2
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
        updateUser={updateUser}
      />
    </>
  )
}

Payments.defaultProps = {
  payments: []
}
