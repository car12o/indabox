import React, { useState, useCallback, useEffect } from "react"
import { connect } from "react-redux"
import { compose } from "lodash/fp"
import { Paper, Typography, Button } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { useApi } from "../../services/Api"
import { Input } from "../../components/Input/Input"

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "85vh"
  },
  paper: {
    width: "450px",
    padding: "25px"
  },
  title: {
    padding: "20px 0"
  },
  button: {
    marginTop: "15px"
  }
})

const initState = ({ email = "", password = "" }) => ({ email, password, errors: {} })

const _Login = ({ user, history, dispatch }) => {
  const [{ email, password, errors }, setter] = compose(
    useState,
    initState
  )(user)
  const setState = useCallback((values) => setter((state) => ({ ...state, ...values })), [setter])
  const classes = useStyles()
  const api = useApi()

  useEffect(() => {
    if (user.logged) {
      history.push("/")
    }
  }, [user])

  const submit = async () => {
    const { body, err } = await api.post("/login", { email, password })
    if (err) {
      setState({ errors: err })
      return
    }

    dispatch({ type: "UPDATE_USER", payload: { ...body, logged: true } })
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={3} onKeyUp={({ keyCode }) => keyCode === 13 && submit()}>
        <img src="/assets/logo.png" alt="" />
        <Typography classes={{ root: classes.title }} variant="subtitle1">
          INICIAR SESSÃO
        </Typography>
        <Input
          label="Endereço de email"
          value={email}
          onChange={(email) => setState({ email, errors: {} })}
          error={errors.email}
        />
        <Input
          type="password"
          label="Senha"
          value={password}
          onChange={(password) => setState({ password, errors: {} })}
          error={errors.password}
        />
        <Button
          classes={{ root: classes.button }}
          color="primary"
          size="large"
          variant="contained"
          onClick={submit}
        >
          Iniciar sessão
        </Button>
      </Paper>
    </div>
  )
}

export const Login = connect(({ user }) => ({ user }))(_Login)
