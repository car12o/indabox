import React from "react"
import { formatDate } from "../../../services/transform"
import { post } from "../../../services/api"
import { Table } from "../../Table/Table"

const columns = [
  { id: "year", numeric: false, disablePadding: false, label: "ANO" },
  { id: "status", numeric: false, disablePadding: false, label: "ESTADO" },
  { id: "value", numeric: false, disablePadding: false, label: "VALOR" },
  { id: "createdAt", numeric: false, disablePadding: false, label: "DATA DE CRIAÇÃO" },
  { id: "paymentDate", numeric: false, disablePadding: false, label: "DATA DE PAGAMENTO" }
]

export const Quotas = ({ quotas, updateUser, setTabIndex }) => {
  const data = quotas.map((quota) => ({
    ...quota,
    id: quota._id,
    status: quota.payment ? quota.payment.status.label : "Por pagar",
    value: `${quota.value}€`,
    createdAt: formatDate(quota.createdAt),
    paymentDate: quota.payment && quota.payment.paymentDate ? formatDate(quota.payment.paymentDate) : "",
    selectable: ({ payment }) => !payment,
    colored: ({ payment }) => !payment || payment.status.value !== 1
  }))

  const createPayment = async (body) => {
    const { body: partner } = await post("/payments", body)
    updateUser(partner)
    setTabIndex(1)
  }

  return (
    <Table
      columns={columns}
      data={data}
      order="desc"
      orderBy={"year"}
      actions={[
        {
          id: "manual",
          label: "Pagar manualmente",
          onClick: (quotas) => createPayment({ type: "Manual", quotas })
        },
        {
          id: "mbRef",
          label: "Gerar referencia MB",
          onClick: (quotas) => createPayment({ type: "Referencia MB", quotas })
        }
      ]}
      noDataLabel="Nao existem quotas ..."
    />
  )
}

Quotas.defaultProps = {
  quotas: [],
  actions: [],
  setTabIndex: () => { }
}
