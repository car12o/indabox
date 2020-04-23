import React, { useState, useCallback } from "react"
import { compose } from "lodash/fp"
import { FormControl, TextField, Button } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { useApi } from "../../../services/api"
import { UserTabHeader } from "../UserTabHeader"

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative"
  },
  main: {
    padding: "25px"
  },
  container: {
    width: "100%"
  },
  textField: {
    color: `${theme.palette.secondary.main} !important`
  },
  inputLabel: {
    color: `${theme.palette.primary.main} !important`
  },
  buttons: {
    display: "flex",
    justifyContent: "center",
    margin: "30px 0 0 0",
    "& > *": {
      margin: "0 20px"
    }
  }
}))

const initState = (notes) => ({ notes, edit: false })

export const Notes = ({ notes: _notes, userId, updateUser, inactive, blur }) => {
  const [{ notes, edit }, setter] = compose(
    useState,
    initState
  )(_notes)
  const setState = useCallback((values) => setter((state) => ({ ...state, ...values })), [setter])
  const classes = useStyles()
  const api = useApi()

  const submit = async () => {
    const { body, err } = await api.put(`/users/${userId}`, { notes })
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
      <UserTabHeader title="NOTAS" />
      <div className={classes.main}>
        <FormControl classes={{ root: classes.container }} variant="outlined" >
          <TextField
            multiline
            rows="20"
            rowsMax="20"
            variant="outlined"
            value={notes}
            onChange={({ target: { value: notes } }) => setState({ notes })}
            disabled={!edit}
            InputLabelProps={{
              classes: {
                root: classes.inputLabel
              }
            }}
            InputProps={{
              classes: {
                root: classes.textField
              }
            }}
          />
        </FormControl>
        {!inactive && (
          <div className={classes.buttons}>
            {edit
              ? <>
                <Button
                  color="primary"
                  size="large"
                  variant="contained"
                  onClick={() => compose(
                    setter,
                    initState
                  )(notes)}
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
