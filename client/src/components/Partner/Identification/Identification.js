import React, { useState, useCallback } from "react"
import { compose } from "lodash/fp"
import { Button } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { patch } from "../../../services/api"
import { UserTabHeader } from "../UserTabHeader"
import { Input } from "../../Input/Input"
import { Dropdown } from "../../Dropdown/Dropdown"
import { CheckBox } from "../../CheckBox/CheckBox"

const useStyles = makeStyles({
  root: {
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
  role: user.role.value,
  number: user.number,
  nif: user.nif,
  email: user.email,
  password: user.password,
  rePassword: user.rePassword,
  ballotNumber: user.ballotNumber,
  specialty: user.specialty,
  specialtySessions: user.specialtySessions,
  alerts: user.alerts,
  newsletter: user.newsletter,
  errors: {},
  edit: false
})

export const Identification = ({ user, updateUser, titles, roles }) => {
  const [state, setter] = compose(
    useState,
    initState
  )(user)
  const setState = useCallback((values) => setter((state) => ({ ...state, ...values })), [setter])
  const classes = useStyles()

  const submit = async () => {
    const { edit, errors, ...rest } = state
    const data = { ...rest, role: roles.find((role) => role.value === rest.role) }

    const { body, err } = await patch(`/users/${user._id}`, data)
    if (err) {
      setState({ errors: err })
      return
    }

    updateUser(body)
    setState({ edit: false })
  }

  return (
    <>
      <UserTabHeader title="DADOS PESSOAIS" />
      <div className={classes.root}>
        <div className={classes.row}>
          <Dropdown
            value={state.title}
            label="Título"
            options={titles.map((t) => ({ label: t, value: t }))}
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
            value={state.role}
            label="Tipo de sócio"
            options={roles.map((r) => ({ label: r.label, value: r.value }))}
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
            value={state.alerts}
            label="Receber alertas"
            onChange={(alerts) => setState({ alerts, errors: {} })}
            disabled={!state.edit}
          />
          <CheckBox
            value={state.newsletter}
            label="Receber newsletters"
            onChange={(newsletter) => setState({ newsletter, errors: {} })}
            disabled={!state.edit}
          />
        </div>
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
      </div>
    </>
  )
}

Identification.defaultProps = {
  titles: [],
  roles: []
}