import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { FormControl, FormControlLabel, Radio, RadioGroup as RadioGroupMat } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%"
  },
  group: {
    display: "flex",
    flexDirection: "row"
  },
  column: {
    flexDirection: "column"
  },
  disabled: {
    color: `${theme.palette.secondary.main} !important`
  },
  disabledRadio: {
    color: `${theme.palette.primary.main} !important`
  }
}))

export const RadioGroup = ({ value, options, onChange, disabled, column }) => {
  const classes = useStyles()

  return (
    <FormControl component="fieldset" className={classes.root}>
      <RadioGroupMat
        className={`${classes.group} ${column && classes.column}`}
        value={String(value)}
        onChange={({ target: { value } }) => onChange(value === "true")}
      >
        {options.map(({ label, value: v }, i) => (
          <FormControlLabel
            classes={{ disabled: classes.disabled }}
            key={`formControlLabel-${i}`}
            value={String(v)}
            control={<Radio classes={{ root: classes.disabledRadio }} />}
            label={label}
            disabled={disabled}
          />
        ))}
      </RadioGroupMat>
    </FormControl >
  )
}
