import React, { useState, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { LinearProgress, Paper } from "@material-ui/core"
import { get } from "../../services/api"
import { Title } from "../../components/Title/Title"
import { Table } from "../../components/Table/Table"

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
  const [{ loading, partners }, setState] = useState({ loading: true, partners: [] })
  const classes = useStyles()

  const fetchPartners = async () => {
    const { body: partners } = await get("/users")
    setState({ partners, loading: false })
  }

  useEffect(() => {
    fetchPartners()
  }, [])

  return (
    loading
      ? <LinearProgress />
      : <Paper className={classes.root} elevation={1}>
        < Title label="Sócios" />
        <Table
          columns={columns}
          data={partners.map(({ _id: id, role: { label: role }, ...props }) => ({ _id: id, role, ...props }))}
          orderBy="firstName"
          onRowClick={(partner) => history.push(`/partners/${partner._id}`)}
          rowsPerPage={15}
          rowsPerPageOptions={[15, 30, 60]}
          noDataLabel="Sem dados ..."
        />
      </Paper >
  )
}
