import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { FormControlLabel, Checkbox } from "@material-ui/core"

const useStyles = makeStyles(({ palette }) => ({
  root: {
    cursor: ({ disabled }) => (disabled && "default") || "pointer",
    "&>*": {
      color: `${palette.secondary.main} !important`
    }
  },
  checkBox: {
    color: `${palette.primary.main} !important`
  }
}))

export const CheckBox = ({ classes: c, label, value, onChange, onClick, disabled }) => {
  const classes = useStyles({ disabled })

  return (
    <FormControlLabel classes={{ root: `${classes.root} ${c.root}` }} onClick={onClick}
      control={
        <Checkbox
          classes={{ root: classes.checkBox }}
          checked={value}
          onChange={disabled ? () => { } : () => onChange(!value)}
          disabled={disabled}
        />
      }
      label={label}
    />
  )
}
