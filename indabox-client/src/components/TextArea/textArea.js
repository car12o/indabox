import React, { Component } from "react"
import classNames from "classnames"
import { withStyles, withTheme } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import FormControl from "@material-ui/core/FormControl"

const styles = {
  root: {
    width: "100%",
    marginBottom: "5px"
  },
  container: {}
}

class TextArea extends Component {
  render() {
    const { classes, theme, label, value, onChange, disabled, helperText } = this.props

    return (
      <div className={classNames(classes.root, classes.container)}>
        <FormControl classes={{ root: classes.root }} variant="outlined" >
          <TextField
            id="outlined-multiline-flexible"
            label={label}
            multiline
            InputLabelProps={{
              style: { color: theme.palette.primary.main }
            }}
            InputProps={{
              style: { color: theme.palette.secondary.main }
            }}
            rows="12"
            rowsMax="25"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={classes.textField}
            helperText={helperText}
            variant="outlined"
            disabled={disabled}
          />
        </FormControl>
      </div>
    )
  }
}

export default withTheme()(withStyles(styles)(TextArea))
