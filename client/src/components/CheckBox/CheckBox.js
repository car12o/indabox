import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { FormControlLabel, Checkbox } from "@material-ui/core"

const useStyles = makeStyles({
  root: {
    cursor: ({ disabled }) => (disabled && "default") || "pointer"
  }
})

export const CheckBox = ({ label, onChange, value, disabled }) => {
  const classes = useStyles({ disabled })

  return (
    <FormControlLabel classes={classes}
      control={
        <Checkbox
          classes={classes}
          checked={value}
          onChange={disabled ? () => { } : () => onChange(!value)}
          disableRipple={disabled}
        />
      }
      label={label}
    />
  )
}
