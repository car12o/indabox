import React from "react"
import { makeStyles, useTheme } from "@material-ui/core/styles"
import { TextField, MenuItem, FormControl } from "@material-ui/core"

const useStyles = makeStyles({
  formControl: ({ classes }) => ({
    width: "100%",
    marginBottom: "15px",
    ...classes.formControl
  }),
  input: {}
})

export const Dropdown = ({ classes, label, value, options, onChange, disabled, variant }) => {
  const _classes = useStyles({ classes })
  const theme = useTheme()

  return (
    <FormControl classes={{ root: _classes.formControl }} variant={variant} >
      <TextField
        select
        InputLabelProps={{ style: { color: theme.palette.primary.main } }}
        InputProps={{
          className: _classes.input,
          style: { color: theme.palette.secondary.main }
        }}
        variant={variant}
        label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onClick={(e) => e.stopPropagation()}
        disabled={disabled}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </FormControl>
  )
}

Dropdown.defaultProps = {
  classes: {},
  value: "",
  variant: "standard"
}
