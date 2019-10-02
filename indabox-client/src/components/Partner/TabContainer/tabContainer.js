import React, { Component } from "react"
import { withStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"

const styles = (theme) => ({
  root: {},
  body: {},
  footer: {
    height: "65px",
    backgroundColor: theme.palette.background.default,
    display: "flex",
    justifyContent: "center"
  },
  buttons: {
    margin: "10px 25px"
  }
})

class TabContainer extends Component {
  render() {
    const { classes, children, buttons, selected, disabled } = this.props

    return (
      <div className={classes.root}>
        <div className={classes.body} ref={this.body}>
          {children}
        </div>
        {buttons
          ? <div className={classes.footer}>
            {buttons.map((button, i) =>
              <Button
                key={i}
                classes={{ contained: classes.buttons }}
                color={button.color}
                size="large"
                variant="contained"
                onClick={() => button.fn(selected)}
                disabled={disabled}
              >
                {button.label}
              </Button>)}
          </div>
          : ""
        }

      </div>
    )
  }
}

export default withStyles(styles)(TabContainer)
