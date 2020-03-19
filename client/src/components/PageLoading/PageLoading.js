import React from "react"
import { CircularProgress } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles({
  root: {
    height: "98vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
})

export const PageLoading = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <CircularProgress color="primary" size={150} />
    </div>
  )
}
