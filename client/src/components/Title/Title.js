import React from "react"
import { Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles({
  root: {
    padding: "20px 25px 15px 25px"
  }
})

export const Title = ({ label }) => {
  const classes = useStyles()

  return (
    <Typography className={classes.root} variant="h6" id="tableTitle">
      {label}
    </Typography>
  )
}
