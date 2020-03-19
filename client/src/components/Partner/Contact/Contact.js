import React, { useState, useCallback } from "react"
import { compose } from "lodash/fp"
import { Typography, Button } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { patch } from "../../../services/api"
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
  road: user.address.road,
  postCode: user.address.postCode,
  city: user.address.city,
  country: user.address.country,
  mobile: user.mobile,
  phone: user.phone,
  billing: {
    name: user.billing.name,
    nif: user.billing.nif,
    road: user.billing.address.road,
    postCode: user.billing.address.postCode,
    city: user.billing.address.city,
    country: user.billing.address.country,
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
    const { billing, ...values } = v
    if (billing) {
      return setter((state) => ({ ...state, ...values, billing: { ...state.billing, ...billing } }))
    }
    return setter((state) => ({ ...state, ...values }))
  }, [setter])

  const classes = useStyles()

  const submit = async () => {
    const { mobile, phone, road, postCode, city, country, billing } = state
    const { name, nif, road: bRoad, postCode: bPostCode, city: bCity, country: bCountry, active } = billing

    const { body, err } = await patch(`/users/${user._id}`, {
      mobile,
      phone,
      address: { road, postCode, city, country },
      billing: { name, nif, active, address: { road: bRoad, postCode: bPostCode, city: bCity, country: bCountry } }
    })
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
            onChange={(active) => setState({ billing: { active }, errors: { billing: {} } })}
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
              value={state.road}
              label="Morada"
              onChange={(road) => setState({ road, errors: { billing: {} } })}
              disabled={!state.edit}
              error={state.errors.road}
            />
            <div className={classes.row}>
              <Input
                type="text"
                value={state.postCode}
                label="Código de Postal"
                onChange={(postCode) => setState({ postCode, errors: { billing: {} } })}
                disabled={!state.edit}
                error={state.errors.postCode}
              />
              <Input
                type="text"
                value={state.city}
                label="Localidade"
                onChange={(city) => setState({ city, errors: { billing: {} } })}
                disabled={!state.edit}
                error={state.errors.city}
              />
            </div>
            <Dropdown
              classes={{ formControl: classes.dropdown }}
              value={state.country}
              label="País"
              options={countries.map((c) => ({ label: c, value: c }))}
              onChange={(country) => setState({ country, errors: { billing: {} } })}
              disabled={!state.edit}
            />
            <Input
              type="text"
              value={state.mobile}
              label="Telemóvel"
              onChange={(mobile) => setState({ mobile, errors: { billing: {} } })}
              disabled={!state.edit}
              error={state.errors.mobile}
            />
            <Input
              type="text"
              value={state.phone}
              label="Telefone"
              onChange={(phone) => setState({ phone, errors: { billing: {} } })}
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
              onChange={(name) => setState({ billing: { name }, errors: { billing: {} } })}
              disabled={!state.edit}
              error={state.errors.billing.name}
            />
            <Input
              type="text"
              value={state.billing.nif}
              label="NIF"
              onChange={(nif) => setState({ billing: { nif }, errors: { billing: {} } })}
              disabled={!state.edit}
              error={state.errors.billing.nif}
            />
            <Input
              type="text"
              value={state.billing.road}
              label="Morada"
              onChange={(road) => setState({ billing: { road }, errors: { billing: {} } })}
              disabled={!state.edit}
              error={state.errors.billing.road}
            />
            <div className={classes.row}>
              <Input
                type="text"
                value={state.billing.postCode}
                label="Código de Postal"
                onChange={(postCode) => setState({ billing: { postCode }, errors: { billing: {} } })}
                disabled={!state.edit}
                error={state.errors.billing.postCode}
              />
              <Input
                type="text"
                value={state.billing.city}
                label="Localidade"
                onChange={(city) => setState({ billing: { city }, errors: { billing: {} } })}
                disabled={!state.edit}
                error={state.errors.billing.city}
              />
            </div>
            <Dropdown
              value={state.billing.country}
              label="País"
              options={countries.map((c) => ({ label: c, value: c }))}
              onChange={(country) => setState({ billing: { country, errors: { billing: {} } } })}
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
