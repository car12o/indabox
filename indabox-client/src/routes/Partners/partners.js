import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import { withStyles } from "@material-ui/core/styles"
import LinearProgress from "@material-ui/core/LinearProgress"
import Paper from "@material-ui/core/Paper"
import { getPartners } from "../../store/actions/partners"
import Title from "../../components/Title/Title"
import Table from "../../components/Table/Table"

const styles = {
  root: {
    background: "#fff"
  }
}

const rows = [
  { id: "number", numeric: false, disablePadding: true, label: "Nº de sócio", width: "5%" },
  { id: "firstName", numeric: false, disablePadding: false, label: "Nome", width: "20%" },
  { id: "lastName", numeric: false, disablePadding: false, label: "Apelido", width: "20%" },
  { id: "nif", numeric: false, disablePadding: false, label: "NIF", width: "15%" },
  { id: "email", numeric: false, disablePadding: false, label: "Endereço de email", width: "25%" },
  { id: "role", numeric: false, disablePadding: false, label: "Tipo de sócio", width: "15%" }
]

const Partners = ({ classes, history, partners, get }) => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    get()
  }, [])

  useEffect(() => {
    setLoading(!partners.list.length)
  }, [partners.list])

  if (loading) {
    return (<LinearProgress />)
  }

  return (
    <Paper className={classes.root} elevation={1}>
      <Title label="Sócios" />
      <Table
        rows={rows}
        data={partners.list.map(({ id, number, firstName, lastName, nif, email, role }) => ({
          id,
          number: number.value,
          firstName: firstName.value,
          lastName: lastName.value,
          nif: nif.value,
          email: email.value,
          role: role.value.label
        }))}
        orderBy="firstName"
        onRowClick={(partner) => history.push(`/partners/${partner.id}`)}
        rowsPerPage={15}
        rowsPerPageOptions={[15, 30, 60]}
        noDataLabel="Sem dados ..."
      />
    </Paper>
  )
}

const mapStateToProps = (state) => ({
  partners: state.partners
})

const mapDispatchToProps = (dispatch) => ({
  get: () => dispatch(getPartners())
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Partners))
