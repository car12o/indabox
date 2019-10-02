import React from "react"
import classNames from "classnames"
import { withStyles } from "@material-ui/core/styles"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import { lighten } from "@material-ui/core/styles/colorManipulator"

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit
  },
  highlight:
    theme.palette.type === "light"
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85)
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark
      },
  spacer: {
    flex: "1 1 100%"
  },
  actions: {
    color: theme.palette.text.secondary
  },
  title: {
    flex: "0 0 auto"
  }
})

class EnhancedTableToolbar extends React.Component {
  render() {
    const { numSelected, classes, title } = this.props
    return (
      <Toolbar
        className={classNames(classes.root, {
          [classes.highlight]: numSelected > 0
        })}
      >
        <div className={classes.title}>
          {numSelected > 0
            ? (
              <Typography color="inherit" variant="subtitle1">
                {numSelected} selecionado
              </Typography>
            )
            : (
              <Typography variant="h6" id="tableTitle">
                {title}
              </Typography>
            )}
        </div>
      </Toolbar>
    )
  }
}

export default withStyles(toolbarStyles)(EnhancedTableToolbar)