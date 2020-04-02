import React, { useState, useCallback, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Paper, Tabs, Tab, LinearProgress } from "@material-ui/core"
import { useApi } from "../../services/api"
import { formatDate } from "../../services/transform"
import { Title } from "../../components/Title/Title"
import { Table } from "../../components/Table/Table"

const useStyles = makeStyles((theme) => ({
  root: {
    background: "#fff"
  },
  tabs: {
    color: theme.palette.secondary.main
  },
  tabSelected: {
    fontWeight: "bold"
  }
}))

const columnsPaymentReceived = [
  { id: "type", numeric: false, disablePadding: true, label: "Topo" },
  { id: "quotas", numeric: false, disablePadding: false, label: "Quotas" },
  { id: "status", numeric: false, disablePadding: false, label: "Estado" },
  { id: "value", numeric: false, disablePadding: false, label: "Total" },
  { id: "user", numeric: false, disablePadding: false, label: "Socio" },
  { id: "paymentDate", numeric: false, disablePadding: false, label: "Data pagamento" }
]

const columnsPaymentWaiting = [
  { id: "type", numeric: false, disablePadding: true, label: "Topo" },
  { id: "quotas", numeric: false, disablePadding: false, label: "Quotas" },
  { id: "status", numeric: false, disablePadding: false, label: "Estado" },
  { id: "value", numeric: false, disablePadding: false, label: "Total" },
  { id: "user", numeric: false, disablePadding: false, label: "Socio" },
  { id: "createdAt", numeric: false, disablePadding: false, label: "Data criação" }
]

export const Dashboard = ({ history }) => {
  const [{ index, payments, loading }, setter] = useState({ index: 0, payments: [], loading: true })
  const setState = useCallback((values) => setter((state) => ({ ...state, ...values })), [setter])
  const classes = useStyles()
  const api = useApi()

  const fetchPayments = async () => {
    const { body: payments } = await api.get("/payments")
    setState({ payments, loading: false })
  }

  useEffect(() => {
    fetchPayments()
  }, [])

  const paymentReceived = payments
    .filter(({ paymentDate, deletedBy }) => paymentDate && !deletedBy)
    .map(({ type, quotasYear, status, value, user, paymentDate }) => ({
      type,
      status,
      quotas: quotasYear.join(","),
      value: `${value}€`,
      user: user.firstName,
      userId: user._id,
      paymentDate: formatDate(paymentDate)
    }))
  const paymentWaiting = payments
    .filter(({ paymentDate, deletedBy }) => !paymentDate && !deletedBy)
    .map(({ type, quotasYear, status, value, user, createdAt }) => ({
      type,
      status,
      quotas: quotasYear.join(","),
      value: `${value}€`,
      user: user.firstName,
      userId: user._id,
      createdAt: formatDate(createdAt)
    }))

  return (
    loading
      ? <LinearProgress />
      : <Paper className={classes.root} elevation={1}>
        <Title label="Administração" />
        <Tabs
          value={index}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          onChange={(_, index) => setState({ index })}
        >
          <Tab
            classes={{ textColorPrimary: classes.tabs, selected: classes.tabSelected }}
            label="Pagamentos recebidos"
          />
          <Tab
            classes={{ textColorPrimary: classes.tabs, selected: classes.tabSelected }}
            label="Aguardar pagamentos"
          />
        </Tabs>
        {index === 0 && <Table
          columns={columnsPaymentReceived}
          data={paymentReceived}
          orderBy="paymentDate"
          order="desc"
          onRowClick={({ userId }) => history.push(`/partners/${userId}`) }
          rowsPerPage={14}
          rowsPerPageOptions={[14, 28, 32]}
          noDataLabel="Sem dados ..."
        />}
        {index === 1 && <Table
          columns={columnsPaymentWaiting}
          data={paymentWaiting}
          orderBy="createdAt"
          order="desc"
          onRowClick={({ userId }) => history.push(`/partners/${userId}`) }
          noDataLabel="Sem dados ..."
        />}
      </Paper >
  )
}
