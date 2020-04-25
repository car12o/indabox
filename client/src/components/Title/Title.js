import React from "react"
import { Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { MenuOptions } from "../MenuOptions/MenuOptions"

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "space-between",
    padding: "25px 35px"
  },
  button: {
    padding: 0
  }
})

export const Title = ({ label, options }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Typography variant="h6" id="tableTitle">
        {label}
      </Typography>
      {options && (
        <MenuOptions classes={classes} options={options} />
      )}
    </div>
  )
}
