import React from "react"
import { withStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"

const styles = {
  root: {
    padding: "20px 25px 15px 25px"
  }
}

const Title = ({ classes, label }) => (
  <Typography className={classes.root} variant="h6" id="tableTitle">
    {label}
  </Typography>
)

export default withStyles(styles)(Title)
