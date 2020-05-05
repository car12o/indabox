import React, { useState, useCallback, useEffect } from "react"
import { compose } from "lodash/fp"
import { makeStyles, Paper, LinearProgress } from "@material-ui/core"
import { useApi } from "../../services/Api"
import { toQueryString } from "../../services/transform"
import { Header } from "./Header"
import { Tables } from "./Tables"

const useStyles = makeStyles((theme) => ({
  root: {
    background: "#fff"
  },
  header: {
    marginBottom: theme.spacing(3)
  }
}))

export const Dashboard = ({ history }) => {
  const [{ year, totals, loading }, setter] = useState({ year: 0, totals: {}, loading: true })
  const setState = useCallback((values) => setter((state) => ({ ...state, ...values })), [setter])
  const classes = useStyles()
  const api = useApi()

  const fetchTotals = async () => {
    const { body: totals } = await compose(
      (query) => api.get(`/totals${query}`),
      toQueryString
    )(year && { year })
    setState({ totals, loading: false })
  }

  useEffect(() => {
    fetchTotals()
  }, [year])

  return (
    loading
      ? <LinearProgress />
      : <>
        <Paper className={`${classes.root} ${classes.header}`} elevation={1}>
          <Header totals={totals} year={year} onYearChange={(year) => setState({ year })} />
        </Paper>
        <Tables history={history} />
      </>
  )
}
