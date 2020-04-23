import React, { useState, useCallback } from "react"
import { compose } from "lodash/fp"
import { makeStyles, Button } from "@material-ui/core"
import { useApi } from "../../../services/api"
import { UserTabHeader } from "../UserTabHeader"
import { Input } from "../../Input/Input"
import { Dropdown } from "../../Dropdown/Dropdown"
import { CheckBox } from "../../CheckBox/CheckBox"

const useStyles = makeStyles({
  root: {
    position: "relative"
  },
  container: {
    padding: "25px"
  },
  row: {
    display: "flex",
    "& > *": {
      padding: "5px 25px"
    }
  },
  buttons: {
    display: "flex",
    justifyContent: "center",
    margin: "30px 0 0 0",
    "& > *": {
      margin: "0 20px"
    }
  }
})

const initState = (user) => ({
  title: user.title,
  firstName: user.firstName,
  lastName: user.lastName,
  role: user.role,
  number: user.number,
  nif: user.nif,
  email: user.email,
  password: user.password,
  rePassword: user.rePassword,
  ballotNumber: user.ballotNumber,
  specialty: user.specialty,
  specialtySessions: user.specialtySessions,
  newsletter: user.newsletter,
  errors: {},
  edit: false
})

export const Identification = ({ user, updateUser, titles, roles, inactive, blur }) => {
  const [state, setter] = compose(
    useState,
    initState
  )(user)
  const setState = useCallback((values) => setter((state) => ({ ...state, ...values })), [setter])
  const classes = useStyles()
  const api = useApi()

  const submit = async () => {
    const { edit, errors, ...data } = state
    const { body, err } = await api.put(`/users/${user._id}`, data)
    if (err) {
      setState({ errors: err })
      return
    }

    updateUser(body)
    setState({ edit: false })
  }

  return (
    <div className={classes.root}>
      {blur && <div className="blur-content"></div>}
      <UserTabHeader title="DADOS PESSOAIS" />
      <div className={classes.container}>
        <div className={classes.row}>
          <Dropdown
            value={(titles.length && state.title) || ""}
            label="Título"
            options={titles}
            onChange={(title) => setState({ title, errors: {} })}
            disabled={!state.edit}
          />
          <Input
            type="text"
            value={state.firstName}
            label="Nome"
            onChange={(firstName) => setState({ firstName, errors: {} })}
            disabled={!state.edit}
            error={state.errors.firstName}
          />
          <Input
            type="text"
            value={state.lastName}
            label="Apelido"
            onChange={(lastName) => setState({ lastName, errors: {} })}
            disabled={!state.edit}
            error={state.errors.lastName}
          />
        </div>
        <div className={classes.row}>
          <Dropdown
            value={(roles.length && state.role) || ""}
            label="Tipo de sócio"
            options={roles}
            onChange={(role) => setState({ role, errors: {} })}
            disabled={!state.edit}
          />
          <Input
            type="text"
            value={state.number}
            label="Nº de sócio"
            onChange={(number) => setState({ number, errors: {} })}
            disabled={!state.edit}
            error={state.errors.number}
          />
          <Input
            type="text"
            value={state.nif}
            label="NIF"
            onChange={(nif) => setState({ nif, errors: {} })}
            disabled={!state.edit}
            error={state.errors.nif}
          />
        </div>
        <div className={classes.row}>
          <Input
            type="text"
            value={state.email}
            label="Endereço de email"
            onChange={(email) => setState({ email, errors: {} })}
            disabled={!state.edit}
            error={state.errors.email}
          />
          <Input
            type="password"
            value={state.password}
            label="Senha"
            onChange={(password) => setState({ password, errors: {} })}
            disabled={!state.edit}
            error={state.errors.password}
          />
          <Input
            type="password"
            value={state.rePassword}
            label="Repetir Senha"
            onChange={(rePassword) => setState({ rePassword, errors: {} })}
            disabled={!state.edit}
          />
        </div>
        <div className={classes.row}>
          <Input
            type="text"
            value={state.ballotNumber}
            label="Nº de cédula"
            onChange={(ballotNumber) => setState({ ballotNumber, errors: {} })}
            disabled={!state.edit}
            error={state.errors.ballotNumber}
          />
          <Input
            type="text"
            value={state.specialty}
            label="Especialidade profissional"
            onChange={(specialty) => setState({ specialty, errors: {} })}
            disabled={!state.edit}
            error={state.errors.specialty}
          />
          <Input
            type="text"
            value={state.specialtySessions}
            label="Secções especializadas"
            onChange={(specialtySessions) => setState({ specialtySessions, errors: {} })}
            disabled={!state.edit}
            error={state.errors.specialtySessions}
          />
        </div>
        <div className={classes.row}>
          <CheckBox
            value={state.newsletter}
            label="Receber newsletters"
            onChange={(newsletter) => setState({ newsletter, errors: {} })}
            disabled={!state.edit}
          />
        </div>
        {!inactive && (
          <div className={classes.buttons}>
            {state.edit
              ? <>
                <Button
                  color="primary"
                  size="large"
                  variant="contained"
                  onClick={() => compose(
                    setter,
                    initState
                  )(user)}
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
              </>
              : <Button
                color="primary"
                size="large"
                variant="contained"
                onClick={() => setState({ edit: true })}
              >
                Editar
              </Button>
            }
          </div>
        )}
      </div>
    </div>
  )
}

Identification.defaultProps = {
  titles: [""],
  roles: [""]
}
