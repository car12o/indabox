import React, { useState, useCallback } from "react"
import { makeStyles, Dialog, DialogTitle, DialogContent, Button } from "@material-ui/core"
import { useApi } from "../../../services/Api"
import { Input } from "../../../components/Input/Input"
import { Dropdown } from "../../../components/Dropdown/Dropdown"

const useStyles = makeStyles({
  title: {
    width: "570px",
    color: "white",
    margin: "0px"
  },
  container: {
    margin: "25px 0",
    width: "750px"
  },
  row: {
    display: "flex",
    height: "85px",
    "& > *": {
      padding: "0 25px"
    }
  },
  buttons: {
    display: "flex",
    height: "45px",
    marginTop: "40px",
    justifyContent: "center",
    "& > *": {
      margin: "0 25px"
    }
  }
})

const initState = () => ({
  title: "",
  firstName: "",
  lastName: "",
  role: "",
  nif: "",
  email: "",
  errors: {}
})

export const PartnerCreate = ({ open, roles, titles, onClose, history }) => {
  const [state, setter] = useState(initState())
  const setState = useCallback((values) => setter((state) => ({ ...state, ...values })), [setter])
  const classes = useStyles()
  const api = useApi()

  const _onClose = () => {
    setState(initState())
    onClose()
  }

  const submit = async () => {
    const { errors, ...data } = state
    const { body, err } = await api.post("/users", data)
    if (err) {
      setState({ errors: err })
      return
    }

    history.push(`/partners/${body._id}`)
  }

  return (
    <Dialog
      maxWidth="xl"
      aria-labelledby="simple-dialog-title"
      onClose={_onClose}
      open={open}
    >
      <DialogTitle classes={{ root: "gradient-background" }}>
        <p className={classes.title}>Novo sócio</p>
      </DialogTitle>
      <DialogContent>
        <div className={classes.container}>
          <div className={classes.row}>
            <Dropdown
              value={state.title}
              label="Título"
              options={titles}
              onChange={(title) => setState({ title, errors: {} })}
              error={state.errors.title}
            />
            <Dropdown
              value={state.role}
              label="Tipo de sócio"
              options={roles}
              onChange={(role) => setState({ role, errors: {} })}
              error={state.errors.role}
            />
          </div>
          <div className={classes.row}>
            <Input
              type="text"
              value={state.firstName}
              label="Nome"
              onChange={(firstName) => setState({ firstName, errors: {} })}
              error={state.errors.firstName}
            />
            <Input
              type="text"
              value={state.lastName}
              label="Apelido"
              onChange={(lastName) => setState({ lastName, errors: {} })}
              error={state.errors.lastName}
            />
          </div>
          <div className={classes.row}>
            <Input
              type="text"
              value={state.email}
              label="Endereço de email"
              onChange={(email) => setState({ email, errors: {} })}
              error={state.errors.email}
            />
            <Input
              type="text"
              value={state.nif}
              label="NIF"
              onChange={(nif) => setState({ nif, errors: {} })}
              error={state.errors.nif}
            />
          </div>
          <div className={classes.buttons}>
            <Button
              color="primary"
              size="large"
              variant="contained"
              onClick={_onClose}
            >
              Cancelar
            </Button>
            <Button
              color="primary"
              size="large"
              variant="contained"
              onClick={submit}
            >
              Gravar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
