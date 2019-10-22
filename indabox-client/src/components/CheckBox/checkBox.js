import React, { Component } from "react"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"

class CheckBox extends Component {
  render() {
    const { classes, label, onChange, value, disabled } = this.props

    return (
      <div className={classes.root}>
        <FormControlLabel
          control={
            <Checkbox
              checked={value}
              onChange={disabled ? () => { } : () => onChange(!value)}
              disableRipple={disabled}
            />
          }
          label={label}
        />
      </div>
    )
  }
}

export default CheckBox
