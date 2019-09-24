import React, { Component } from "react"
import classNames from "classnames"
import { withTheme, withStyles } from "@material-ui/core/styles"
import FormControl from "@material-ui/core/FormControl"
import FormHelperText from "@material-ui/core/FormHelperText"
import TextField from "@material-ui/core/TextField"

const styles = theme => ({
  root: {
    width: "100%",
    marginBottom: "8px"
  },
  textField: {
    color: `${theme.palette.secondary.main} !important`
  },
  inputLabel: {
    color: `${theme.palette.primary.main} !important`
  }
})

class Input extends Component {
  render() {
    const { classes, label, type, value, onChange, error, disabled, styles } = this.props

    return (
      <div className={classNames(classes.root, styles)}>
        <FormControl
          classes={{ root: classes.root }}
          variant="standard"
          error={error ? true : false}>
          <TextField
            label={label}
            value={value}
            onChange={e => onChange(e.target.value)}
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
            type={type ? type : "text"}
          />
          <FormHelperText id="component-error-text">{error}</FormHelperText>
        </FormControl>
      </div>
    )
  }
}

export default withTheme()(withStyles(styles)(Input))
