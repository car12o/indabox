import React, { useState, useCallback, useEffect } from "react"
import { compose } from "lodash/fp"
import { makeStyles, Paper, Tabs, Tab } from "@material-ui/core"
import { format } from "date-fns"
import { useApi } from "../../../services/Api"
import { toQueryString } from "../../../services/transform"
import { DatePicker } from "../../../components/DatePicker"
import { PaymentReceived } from "./PaymentReceived"
import { PaymentWaiting } from "./PaymentWaiting"
import { PaymentMissing } from "./PaymentMissing"

const TABS_URL = {
  0: "/payments",
  1: "/payments",
  2: "/quotas"
}

const TABS_FILTERS_DEFAULT = {
  0: { sort: "paymentDate,-1", field: "paymentDate", filters: {} },
  1: { sort: "createdAt,-1", field: "createdAt", filters: { paymentDate: null } },
  2: { sort: "createdAt,-1", field: "createdAt", filters: { payment: null } }
}

const useStyles = makeStyles((theme) => ({
  pickers: {
    display: "flex",
    justifyContent: "flex-end",
    "&>*": {
      margin: theme.spacing(2, 4)
    }
  },
  tabs: {
    color: theme.palette.secondary.main
  },
  tabSelected: {
    fontWeight: "bold"
  }
}))

const resetDates = () => {
  const now = new Date()
  return {
    dateStart: new Date(`${now.getFullYear()}-01-01`),
    dateEnd: now
  }
}

const initState = {
  index: 0,
  loading: true,
  payments: [],
  quotas: [],
  count: 0,
  limit: 8,
  page: 0,
  ...TABS_FILTERS_DEFAULT[0],
  ...resetDates()
}

export const Tables = ({ history }) => {
  const [state, setter] = useState(initState)
  const setState = useCallback((values) => setter((state) => ({ ...state, ...values })), [setter])
  const classes = useStyles()
  const api = useApi()
  const [orderBy, order] = state.sort.split(",")

  const fetchData = async (data = {}, { index = state.index, filters = state.filters, loading = true } = {}) => {
    if (index || loading) setState({ index, loading })
    const query = {
      sort: state.sort,
      limit: state.limit,
      page: state.page,
      field: state.field,
      ...filters,
      ...data
    }
    const { body } = await compose(
      (query) => api.get(`${TABS_URL[index]}${query}`),
      toQueryString
    )({
      ...query,
      dateStart: format(data.dateStart || state.dateStart, "yyyy-MM-dd"),
      dateEnd: format(data.dateEnd || state.dateEnd, "yyyy-MM-dd")
    })

    setState({ ...query, ...body, filters, loading: false })
  }

  useEffect(() => {
    fetchData()
  }, [])

  const onRequestSort = (_orderBy) => () => {
    if (orderBy === _orderBy) {
      fetchData({ sort: `${orderBy},${order === "1" ? "-1" : "1"}`, page: 0 })
      return
    }
    fetchData({ sort: `${_orderBy},-1`, page: 0 })
  }

  return (
    <Paper className={classes.root} elevation={1}>
      <div className={classes.pickers}>
        <DatePicker
          label="Data inicio"
          value={state.dateStart}
          onChange={(dateStart) => fetchData({ dateStart })}
        />
        <DatePicker
          label="Data fim"
          value={state.dateEnd}
          onChange={(dateEnd) => fetchData({ dateEnd })}
          disableFuture
        />
      </div>
      <Tabs
        value={state.index}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        onChange={(_, index) => {
          const { filters, ...rest } = TABS_FILTERS_DEFAULT[index]
          fetchData({ page: 0, ...rest, ...resetDates() }, { index, filters, loading: true })
        }}
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
      {state.index === 0 && (
        <PaymentReceived
          payments={state.payments}
          count={state.count}
          orderBy={orderBy}
          order={order === "1" ? "asc" : "desc"}
          page={state.page}
          limit={state.limit}
          history={history}
          loading={state.loading}
          fetchData={(...args) => fetchData(...args)}
          onRequestSort={onRequestSort}
        />
      )}
      {state.index === 1 && (
        <PaymentWaiting
          payments={state.payments}
          count={state.count}
          orderBy={orderBy}
          order={order === "1" ? "asc" : "desc"}
          page={state.page}
          limit={state.limit}
          history={history}
          loading={state.loading}
          fetchData={(...args) => fetchData(...args)}
          onRequestSort={onRequestSort}
        />
      )}
      {state.index === 2 && (
        <PaymentMissing
          quotas={state.quotas}
          count={state.count}
          orderBy={orderBy}
          order={order === "1" ? "asc" : "desc"}
          page={state.page}
          limit={state.limit}
          history={history}
          loading={state.loading}
          fetchData={(...args) => fetchData(...args)}
          onRequestSort={onRequestSort}
        />
      )}
    </Paper >
  )
}
