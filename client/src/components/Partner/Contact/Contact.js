import React, { useState, useCallback } from "react"
import { compose } from "lodash/fp"
import { Typography, Button } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { useApi } from "../../../services/api"
import { UserTabHeader } from "../UserTabHeader"
import { RadioGroup } from "../../RadioGroup/RadioGroup"
import { Input } from "../../Input/Input"
import { Dropdown } from "../../Dropdown/Dropdown"

const useStyles = makeStyles({
  root: {
    padding: "10px 25px 25px 25px"
  },
  container: {
    display: "flex",
    "& > *": {
      padding: "5px 25px"
    }
  },
  column: {
    width: "50%",
    "& > *:first-child": {
      padding: "5px 0 20px 0"
    }
  },
  row: {
    display: "flex",
    "& > *": {
      paddingRight: "50px"
    },
    "& > *:last-child": {
      paddingRight: 0
    }
  },
  dropdown: {
    width: "100%",
    marginBottom: "34px"
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
  mobile: user.mobile,
  phone: user.phone,
  address: {
    road: user.address.road,
    postCode: user.address.postCode,
    city: user.address.city,
    country: user.address.country
  },
  billing: {
    name: user.billing.name,
    nif: user.billing.nif,
    address: {
      road: user.billing.address.road,
      postCode: user.billing.address.postCode,
      city: user.billing.address.city,
      country: user.billing.address.country
    },
    active: user.billing.active
  },
  errors: { billing: {} },
  edit: false
})

export const Contact = ({ user, updateUser, countries }) => {
  const [state, setter] = compose(
    useState,
    initState
  )(user)
  const setState = useCallback((v) => {
    const { errors, address, billing, ...values } = v
    return setter((state) => ({
      ...state,
      ...values,
      address: { ...state.address, ...address || {} },
      billing: { ...state.billing, ...billing || {} },
      errors: errors || { address: {}, billing: {} }
    }))
  }, [setter])
  const classes = useStyles()
  const api = useApi()

  const submit = async () => {
    const { edit, errors, billing, ...rest } = state
    const data = billing.active ? { ...rest, billing } : rest

    const { body, err } = await api.put(`/users/${user._id}`, data)
    if (err) {
      setState({ errors: err })
      return
    }

    updateUser(body)
    setState({ edit: false })
  }

  return (
    <>
      <UserTabHeader title="CONTACTOS" />
      <div className={classes.root}>
        <div className={classes.container}>
          <RadioGroup
            value={state.billing.active}
            options={[
              { label: "Faturar com esta morada", value: false },
              { label: "Faturar noutro nome", value: true }
            ]}
            onChange={(active) => setState({ billing: { active } })}
            disabled={!state.edit}
          />
        </div>
        <div className={classes.container}>
          <div className={classes.column}>
            <Typography variant="subtitle1" color="secondary" >
              Dados pessoais
            </Typography>
            <Input
              type="text"
              value={state.address.road}
              label="Morada"
              onChange={(road) => setState({ address: { road } })}
              disabled={!state.edit}
              error={state.errors.road}
            />
            <div className={classes.row}>
              <Input
                type="text"
                value={state.address.postCode}
                label="Código de Postal"
                onChange={(postCode) => setState({ address: { postCode } })}
                disabled={!state.edit}
                error={state.errors.postCode}
              />
              <Input
                type="text"
                value={state.address.city}
                label="Localidade"
                onChange={(city) => setState({ address: { city } })}
                disabled={!state.edit}
                error={state.errors.city}
              />
            </div>
            <Dropdown
              classes={{ formControl: classes.dropdown }}
              value={state.address.country}
              label="País"
              options={countries}
              onChange={(country) => setState({ address: { country } })}
              disabled={!state.edit}
            />
            <Input
              type="text"
              value={state.mobile}
              label="Telemóvel"
              onChange={(mobile) => setState({ mobile })}
              disabled={!state.edit}
              error={state.errors.mobile}
            />
            <Input
              type="text"
              value={state.phone}
              label="Telefone"
              onChange={(phone) => setState({ phone })}
              disabled={!state.edit}
              error={state.errors.phone}
            />
          </div>
          {state.billing.active && <div className={classes.column}>
            <Typography variant="subtitle1" color="secondary" >
              Dados de faturação
            </Typography>
            <Input
              type="text"
              value={state.billing.name}
              label="Nome ou Empresa"
              onChange={(name) => setState({ billing: { name } })}
              disabled={!state.edit}
              error={state.errors.billing.name}
            />
            <Input
              type="text"
              value={state.billing.nif}
              label="NIF"
              onChange={(nif) => setState({ billing: { nif } })}
              disabled={!state.edit}
              error={state.errors.billing.nif}
            />
            <Input
              type="text"
              value={state.billing.address.road}
              label="Morada"
              onChange={(road) => setState({ billing: { address: { road } } })}
              disabled={!state.edit}
              error={state.errors.billing.road}
            />
            <div className={classes.row}>
              <Input
                type="text"
                value={state.billing.address.postCode}
                label="Código de Postal"
                onChange={(postCode) => setState({ billing: { address: { postCode } } })}
                disabled={!state.edit}
                error={state.errors.billing.postCode}
              />
              <Input
                type="text"
                value={state.billing.address.city}
                label="Localidade"
                onChange={(city) => setState({ billing: { address: { city } } })}
                disabled={!state.edit}
                error={state.errors.billing.city}
              />
            </div>
            <Dropdown
              value={state.billing.address.country}
              label="País"
              options={countries}
              onChange={(country) => setState({ billing: { address: { country } } })}
              disabled={!state.edit}
            />
          </div>}
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

Contact.defaultProps = {
  countries: []
}
