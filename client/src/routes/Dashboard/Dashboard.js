import React, { useState, useCallback, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Paper, Tabs, Tab, LinearProgress } from "@material-ui/core"
import { useApi } from "../../services/api"
import { Title } from "../../components/Title/Title"
import { PaymentReceived } from "./PaymentReceived"
import { PaymentWaiting } from "./PaymentWaiting"
import { PaymentMissing } from "./PaymentMissing"

const useStyles = makeStyles((theme) => ({
  root: {
    background: "#fff"
  },
  header: {
    marginBottom: theme.spacing(3)
  },
  tabs: {
    color: theme.palette.secondary.main
  },
  tabSelected: {
    fontWeight: "bold"
  }
}))

export const Dashboard = ({ history }) => {
  const [{ index, payments, quotas, loading }, setter] = useState({ index: 0, payments: [], quotas: [], loading: true })
  const setState = useCallback((values) => setter((state) => ({ ...state, ...values })), [setter])
  const classes = useStyles()
  const api = useApi()

  const fetch = async () => {
    const [
      { body: payments },
      { body: quotas }
    ] = await Promise.all([api.get("/payments"), api.get("/quotas?payment=null")])
    setState({ payments, quotas, loading: false })
  }

  useEffect(() => {
    fetch()
  }, [])

  return (
    loading
      ? <LinearProgress />
      : <>
        <Paper className={`${classes.root} ${classes.header}`} elevation={1}>
          <Title label="Administração" />
          {/* <p>Total socios: 0</p>
          <p>Pagamentos recebidos: 0</p>
          <p>Aguardar pagamento: 0</p>
          <p>Quotas sem pagamento: 0</p> */}
        </Paper>
        <Paper className={classes.root} elevation={1}>
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
              label="Aguardar pagamento"
            />
            <Tab
              classes={{ textColorPrimary: classes.tabs, selected: classes.tabSelected }}
              label="Quotas sem pagamento"
            />
          </Tabs>
          {index === 0 && <PaymentReceived payments={payments} history={history} />}
          {index === 1 && <PaymentWaiting payments={payments} history={history} />}
          {index === 2 && <PaymentMissing quotas={quotas} history={history} />}
        </Paper >
      </>
  )
}
