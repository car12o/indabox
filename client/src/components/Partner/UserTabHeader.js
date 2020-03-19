import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Typography } from "@material-ui/core"

const useStyles = makeStyles({
  titleContainer: {
    display: "flex",
    height: "56px",
    alignItems: "center"
  },
  title: {
    paddingLeft: "56px",
    fontWeight: "bold",
    color: "white"
  }
})

export const UserTabHeader = ({ title }) => {
  const classes = useStyles()

  return (
    <div className={`gradient-background ${classes.titleContainer}`}>
      <Typography classes={{ root: classes.title }}>{title}</Typography>
    </div>
  )
}
