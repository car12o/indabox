import React, { useMemo } from "react"
import { formatDate } from "../../../../services/transform"
import { Table } from "../../../../components/Table"
import { Invoice } from "../../../../components/Invoice"

const columns = [
  { id: "type", numeric: false, disablePadding: true, label: "Tipo" },
  { id: "quotas", numeric: false, disablePadding: false, label: "Quotas" },
  { id: "value", numeric: false, disablePadding: false, label: "Total" },
  { id: "userFirstName", numeric: false, disablePadding: false, label: "Nome" },
  { id: "userLastName", numeric: false, disablePadding: false, label: "Apelido" },
  { id: "paymentDate", numeric: false, disablePadding: false, label: "Data pagamento" },
  { id: "invoiceEmited", numeric: false, disablePadding: false, label: "Fatura" }
]

export const PaymentReceived = ({
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
    .map(({ _id, type, quotasYear, value, user, paymentDate, invoiceEmited }) => ({
      type,
      quotas: quotasYear.join(","),
      value: `${value}€`,
      userId: user._id,
      userFirstName: user.firstName,
      userLastName: user.lastName,
      paymentDate: formatDate(paymentDate),
      invoiceEmited: (
        <Invoice
          id={_id}
          status={invoiceEmited}
          onPaymentUpdate={() => fetchData({}, { loading: false })}
        />
      )
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
      rowLoadingHeight="55px"
    />
  )
}
