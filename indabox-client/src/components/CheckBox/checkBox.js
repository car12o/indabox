import React, { Component } from "react"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"

class CheckBox extends Component {
  render() {
    const { label, onChange, value, disabled, styles } = this.props

    return (
      <div className={styles}>
        <FormControlLabel
          control={
            <Checkbox
              checked={value}
              onChange={disabled ? () => { } : e => onChange(!value)}
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
