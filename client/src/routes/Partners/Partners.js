import React, { useState, useEffect, useCallback } from "react"
import { connect } from "react-redux"
import { debounce } from "lodash"
import { makeStyles, Paper } from "@material-ui/core"
import { useApi } from "../../services/api"
import { roles as _Roles } from "../../constants"
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
  search: "",
  sort: "firstName,1",
  limit: 14,
  page: 0,
  count: 0,
  modalOpen: false,
  roles: [],
  titles: []
}

// eslint-disable-next-line no-unused-vars
const _Partners = ({ store, history }) => {
  // console.log(store)
  const [state, setter] = useState(initState)
  const setState = useCallback((values) => setter((state) => ({ ...state, ...values })), [setter])
  const classes = useStyles()
  const api = useApi()
  const [orderBy, order] = state.sort.split(",")

  const fetchUsers = async (data) => {
    const { search, sort, limit, page } = { ...state, ...data }
    const { body: { users, count } } = await api.get(`/users?search=${search}&sort=${sort}&limit=${limit}&page=${page}`)
    setState({ search, sort, limit, page, partners: users, count, loading: false })
  }

  const fetchMetadata = async () => {
    const { body: { roles, titles } } = await api.get("/metadata")
    setState({ roles, titles })
  }

  useEffect(() => {
    const { search, sort, limit, page } = state
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

  const debounceOnSearch = useCallback(debounce(({ search, sort, limit }) => {
    setState({ loading: true })
    fetchUsers({ search, sort, limit, page: 0 })
  }, 500), [])

  return (
    <Paper className={classes.root} elevation={1}>
      <Title
        label="Sócios"
        search={state.search}
        onSearch={(search) => {
          const { sort, limit } = state
          setState({ search })
          debounceOnSearch({ search, sort, limit })
        }}
        options={[
          { label: "Novo sócio", onClick: () => setState({ modalOpen: true }) }
        ]} />
      <Table
        columns={columns}
        data={state.partners.map(({ role, ...props }) => ({ role: _Roles[role], ...props }))}
        orderBy={orderBy}
        order={order === "1" ? "asc" : "desc"}
        onRequestSort={onRequestSort}
        onRowClick={(partner) => history.push(`/partners/${partner._id}`)}
        count={state.count}
        page={state.page}
        onChangePage={(_, page) => {
          setState({ loading: true })
          fetchUsers({ page })
        }}
        rowsPerPage={state.limit}
        rowsPerPageOptions={[14, 30, 60]}
        onChangeRowsPerPage={({ target: { value: limit } }) => fetchUsers({ limit, loading: true })}
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

export const Partners = connect((store) => ({ store }))(_Partners)
