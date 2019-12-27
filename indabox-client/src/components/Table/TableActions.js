import React from "react"
import { withStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"

const styles = {
  root: {
    display: "flex",
    justifyContent: "center",
    padding: "0 0 15px 0"
  },
  button: {
    margin: "0 20px"
  }
}

const TableActions = ({ classes, actions, selected }) => (
  <div className={classes.root}>
    {actions.map((action, i) => (
      <Button
        key={i}
        classes={{ root: classes.button }}
        color="primary"
        size="large"
        variant="contained"
        disabled={selected.length === 0}
        onClick={() => action.onClick(selected)}
      >
        {action.label}
      </Button>
    ))}
  </div>
)

export default withStyles(styles)(TableActions)
