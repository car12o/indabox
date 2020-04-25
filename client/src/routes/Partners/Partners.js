import React, { useState, useEffect, useCallback } from "react"
import { makeStyles, LinearProgress, Paper } from "@material-ui/core"
import { useApi } from "../../services/api"
import { roles as _Roles } from "../../constants"
import { Title } from "../../components/Title/Title"
import { Table } from "../../components/Table/Table"
import { PartnerCreate } from "./PartnerCreate"

const useStyles = makeStyles({
  root: {
    background: "#fff"
  }
})

const columns = [
  { id: "number", numeric: false, disablePadding: false, label: "Nº", width: "5%" },
  { id: "firstName", numeric: false, disablePadding: false, label: "Nome", width: "20%" },
  { id: "lastName", numeric: false, disablePadding: false, label: "Apelido", width: "20%" },
  { id: "nif", numeric: false, disablePadding: false, label: "NIF", width: "15%" },
  { id: "email", numeric: false, disablePadding: false, label: "Endereço de email", width: "25%" },
  { id: "role", numeric: false, disablePadding: false, label: "Tipo de sócio", width: "15%" }
]

export const Partners = ({ history }) => {
  const [{ loading, partners, modalOpen, roles, titles }, setter] = useState({
    loading: true,
    partners: [],
    modalOpen: false,
    roles: [],
    titles: []
  })
  const setState = useCallback((values) => setter((state) => ({ ...state, ...values })), [setter])
  const classes = useStyles()
  const api = useApi()

  const fetch = async () => {
    const [{ body: partners }, { body: { roles, titles } }] = await Promise.all([
      api.get("/users"),
      api.get("/metadata")
    ])
    setState({ partners, roles, titles, loading: false })
  }

  useEffect(() => {
    fetch()
  }, [])

  return (
    loading
      ? <LinearProgress />
      : <Paper className={classes.root} elevation={1}>
        <Title label="Sócios" options={[
          { label: "Novo sócio", onClick: () => setState({ modalOpen: true }) }
        ]} />
        <Table
          columns={columns}
          data={partners.map(({ role, ...props }) => ({ role: _Roles[role], ...props }))}
          orderBy="firstName"
          onRowClick={(partner) => history.push(`/partners/${partner._id}`)}
          rowsPerPage={15}
          rowsPerPageOptions={[15, 30, 60]}
          noDataLabel="Sem dados ..."
        />
        <PartnerCreate
          open={modalOpen}
          roles={roles}
          titles={titles}
          onClose={() => setState({ modalOpen: false })}
          history={history}
        />
      </Paper >
  )
}
