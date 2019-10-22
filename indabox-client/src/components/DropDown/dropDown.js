import React, { Component } from "react"
import classNames from "classnames"
import { withTheme, withStyles } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import MenuItem from "@material-ui/core/MenuItem"
import FormControl from "@material-ui/core/FormControl"

const styles = {
  root: {
    width: "100%",
    marginBottom: "8px"
  },
  container: {}
}

class DropDown extends Component {
  render() {
    const { classes, theme, label, value, options, onChange, disabled, variant, inputClasses } = this.props

    return (
      <div className={classNames(classes.root, classes.container)}>
        <FormControl classes={{ root: classes.root }} variant={variant || "standard"} >
          <TextField
            select
            InputLabelProps={{
              style: { color: theme.palette.primary.main }
            }}
            InputProps={{ style: { ...inputClasses, color: theme.palette.secondary.main } }}
            variant={variant || "standard"}
            label={label}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>
      </div>
    )
  }
}

export default withTheme()(withStyles(styles)(DropDown))
