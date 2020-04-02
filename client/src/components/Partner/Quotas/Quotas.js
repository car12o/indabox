import React from "react"
import { formatDate } from "../../../services/transform"
import { useApi } from "../../../services/api"
import { Table } from "../../Table/Table"

const columns = [
  { id: "year", numeric: false, disablePadding: false, label: "ANO" },
  { id: "status", numeric: false, disablePadding: false, label: "ESTADO" },
  { id: "value", numeric: false, disablePadding: false, label: "VALOR" },
  { id: "createdAt", numeric: false, disablePadding: false, label: "DATA DE CRIAÇÃO" },
  { id: "paymentDate", numeric: false, disablePadding: false, label: "DATA DE PAGAMENTO" }
]

export const Quotas = ({ quotas, paymentStatus, updatePaymentAndQuotas, setTabIndex }) => {
  const api = useApi()
  const data = quotas.map((quota) => ({
    ...quota,
    id: quota._id,
    status: quota.payment ? paymentStatus[quota.payment.status] : "Não pago",
    value: `${quota.value}€`,
    createdAt: formatDate(quota.createdAt),
    paymentDate: quota.payment && quota.payment.paymentDate ? formatDate(quota.payment.paymentDate) : "",
    selectable: ({ payment }) => !payment,
    colored: ({ payment }) => !payment || payment.status === "Não pago"
  }))

  const createPayment = async (data) => {
    const { body } = await api.post("/payments", data)
    updatePaymentAndQuotas(body)
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
