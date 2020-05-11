import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import FormControl from "@material-ui/core/FormControl"
import FormHelperText from "@material-ui/core/FormHelperText"
import TextField from "@material-ui/core/TextField"

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "76px",
    marginBottom: "15px"
  },
  container: {},
  textField: {
    color: `${theme.palette.secondary.main} !important`
  },
  inputLabel: {
    color: `${theme.palette.primary.main} !important`
  }
}))

export const Input = ({ classes: _classes = {}, label, type, value, onChange, error, disabled }) => {
  const classes = useStyles()

  return (
    <div className={`${classes.root} ${_classes.container}`}>
      <FormControl
        classes={{ root: classes.root }}
        variant="standard"
        error={Boolean(error)}>
        <TextField
          label={label}
          value={value}
          onChange={({ target: { value } }) => onChange(value)}
          variant="standard"
          placeholder=""
          disabled={disabled}
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
          type={type || "text"}
        />
        <FormHelperText id="component-error-text">{error}</FormHelperText>
      </FormControl>
    </div>
  )
}
