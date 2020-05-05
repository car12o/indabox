import React, { useState, useEffect, useCallback } from "react"
import { connect } from "react-redux"
import { debounce } from "lodash"
import { makeStyles, Paper } from "@material-ui/core"
import { useApi } from "../../services/Api"
import { userRolesText } from "../../constants"
import { Title } from "../../components/Title/Title"
import { Table } from "../../components/Table"
import { PartnerCreate } from "./PartnerCreate"

const useStyles = makeStyles({
  root: {
    background: "#fff"
  }
})

const columns = [
  { id: "number", numeric: false, disablePadding: false, label: "Nº" },
  { id: "firstName", numeric: false, disablePadding: false, label: "Nome" },
  { id: "lastName", numeric: false, disablePadding: false, label: "Apelido" },
  { id: "nif", numeric: false, disablePadding: false, label: "NIF" },
  { id: "email", numeric: false, disablePadding: false, label: "Endereço de email" },
  { id: "role", numeric: false, disablePadding: false, label: "Tipo de sócio" }
]

const initState = {
  loading: true,
  partners: [],
  count: 0,
  modalOpen: false,
  roles: [],
  titles: []
}

const _Partners = ({ store, setStore, history }) => {
  const [state, setter] = useState(initState)
  const setState = useCallback((values) => setter((state) => ({ ...state, ...values })), [setter])
  const classes = useStyles()
  const api = useApi()
  const [orderBy, order] = store.sort.split(",")

  const fetchUsers = async (data) => {
    setState({ loading: true })
    const { search, sort, limit, page } = { ...store, ...data }
    const { body: { users, count } } = await api.get(`/users?search=${search}&sort=${sort}&limit=${limit}&page=${page}`)
    setStore({ search, sort, limit, page })
    setState({ partners: users, count, loading: false })
  }

  const fetchMetadata = async () => {
    const { body: { roles, titles } } = await api.get("/metadata")
    setState({ roles, titles })
  }

  useEffect(() => {
    const { search, sort, limit, page } = store
    fetchUsers({ search, sort, limit, page })
    fetchMetadata()
  }, [])

  const onRequestSort = (_orderBy) => () => {
    if (orderBy === _orderBy) {
      fetchUsers({ sort: `${orderBy},${order === "1" ? "-1" : "1"}`, page: 0, loading: true })
      return
    }
    fetchUsers({ sort: `${_orderBy},1`, page: 0, loading: true })
  }

  const debounceOnSearch = useCallback(debounce(
    ({ search, sort, limit }) => fetchUsers({ search, sort, limit, page: 0 }),
    500
  ), [])

  return (
    <Paper className={classes.root} elevation={1}>
      <Title
        label="Sócios"
        search={store.search}
        onSearch={(search) => {
          const { sort, limit } = store
          setStore({ search })
          debounceOnSearch({ search, sort, limit })
        }}
        options={[
          { label: "Novo sócio", onClick: () => setState({ modalOpen: true }) }
        ]} />
      <Table
        columns={columns}
        data={state.partners.map(({ role, ...props }) => ({ role: userRolesText[role], ...props }))}
        orderBy={orderBy}
        order={order === "1" ? "asc" : "desc"}
        onRequestSort={onRequestSort}
        onRowClick={(partner) => history.push(`/partners/${partner._id}`)}
        count={state.count}
        page={(state.partners.length > 0 && store.page) || 0}
        onChangePage={(_, page) => fetchUsers({ page })}
        rowsPerPage={store.limit}
        rowsPerPageOptions={[14, 30, 60]}
        onChangeRowsPerPage={({ target: { value: limit } }) => fetchUsers({ limit })}
        noDataLabel="Sem dados ..."
        loading={state.loading}
        dynamic
      />
      <PartnerCreate
        open={state.modalOpen}
        roles={state.roles}
        titles={state.titles}
        onClose={() => setState({ modalOpen: false })}
        history={history}
      />
    </Paper >
  )
}

export const Partners = connect(
  ({ partners }) => ({ store: partners }),
  (dispatch) => ({
    setStore: (payload) => dispatch({ type: "SET_PARTNERS", payload })
  })
)(_Partners)
