import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Typography } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  root: ({ classes }) => ({
    display: "flex",
    flexDirection: "row",
    width: "100%",
    ...classes.root
  }),
  label: ({ classes }) => ({
    width: "100%",
    minWidth: "180px",
    textAlign: "end",
    marginRight: "15px",
    color: theme.palette.primary.main,
    ...classes.label
  }),
  value: ({ classes }) => ({
    width: "100%",
    minWidth: "180px",
    color: theme.palette.secondary.main,
    ...classes.value
  })
}))

export const Stamp = ({ classes, label, value }) => {
  const _classes = useStyles({ classes })

  return (
    <div className={_classes.root}>
      <Typography className={_classes.label} component="p">
        {label}
      </Typography>
      <Typography className={_classes.value} component="p">
        {value}
      </Typography>
    </div>
  )
}

Stamp.defaultProps = {
  classes: {}
}
