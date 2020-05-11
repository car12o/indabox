import React, { useState, useCallback } from "react"
import { compose, merge } from "lodash/fp"
import { Typography, Button } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { useApi } from "../../../services/Api"
import { UserTabHeader } from "../UserTabHeader"
import { RadioGroup } from "../../RadioGroup/RadioGroup"
import { Input } from "../../Input/Input"
import { Dropdown } from "../../Dropdown/Dropdown"

const useStyles = makeStyles({
  root: {
    position: "relative"
  },
  main: {
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
  errors: { address: {}, billing: { address: {} } },
  edit: false
})

export const Contact = ({ user, updateUser, countries, blur }) => {
  const [state, setter] = compose(
    useState,
    initState
  )(user)
  const setState = useCallback((v) => {
    const { errors, ...values } = v
    return setter((state) => ({
      ...merge(state, values),
      errors: errors || { address: {}, billing: { address: {} } }
    }))
  }, [setter])
  const classes = useStyles()
  const api = useApi()

  const submit = async () => {
    const { edit, errors, billing, ...rest } = state
    const data = billing.active ? { ...rest, billing } : rest

    const { body, err } = await api.put(`/users/${user._id}`, data)
    if (err) {
      setState({ errors: merge(errors, err) })
      return
    }

    updateUser(body)
    setState({ edit: false })
  }

  return (
    <div className={classes.root}>
      {blur && <div className="blur-content"></div>}
      <UserTabHeader title="CONTACTOS" />
      <div className={classes.main}>
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
              error={state.errors.address.road}
            />
            <div className={classes.row}>
              <Input
                type="text"
                value={state.address.postCode}
                label="Código de Postal"
                onChange={(postCode) => setState({ address: { postCode } })}
                disabled={!state.edit}
                error={state.errors.address.postCode}
              />
              <Input
                type="text"
                value={state.address.city}
                label="Localidade"
                onChange={(city) => setState({ address: { city } })}
                disabled={!state.edit}
                error={state.errors.address.city}
              />
            </div>
            <Dropdown
              value={(countries.length && state.address.country) || ""}
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
              error={state.errors.billing.address.road}
            />
            <div className={classes.row}>
              <Input
                type="text"
                value={state.billing.address.postCode}
                label="Código de Postal"
                onChange={(postCode) => setState({ billing: { address: { postCode } } })}
                disabled={!state.edit}
                error={state.errors.billing.address.postCode}
              />
              <Input
                type="text"
                value={state.billing.address.city}
                label="Localidade"
                onChange={(city) => setState({ billing: { address: { city } } })}
                disabled={!state.edit}
                error={state.errors.billing.address.city}
              />
            </div>
            <Dropdown
              value={(countries.length && state.billing.address.country) || ""}
              label="País"
              options={countries}
              onChange={(country) => setState({ billing: { address: { country } } })}
              disabled={!state.edit}
            />
          </div>}
        </div>
        {!blur && (
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

Contact.defaultProps = {
  countries: [""]
}
