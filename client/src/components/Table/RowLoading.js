import React from "react"
import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  "@keyframes loading": {
    "0%": {
      transform: "translate3d(-100%, 0, 0)"
    },
    "100%": {
      transform: "translate3d(100%, 0, 0)"
    }
  },
  root: {
    height: ({ height }) => height,
    position: "relative"
  },
  row: {
    width: "calc(100% - 20px)",
    margin: "0 10px",
    height: ({ height }) => `calc(${height} - 5px)`,
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.04)",
    borderRadius: "5px",
    overflow: "hidden",
    "&::after": {
      content: "''",
      width: "100%",
      position: "absolute",
      height: "100%",
      borderRadius: "10px",
      background: `linear-gradient(90deg, ${theme.palette.background.default},
        ${theme.palette.secondary.light}, ${theme.palette.background.default})`,
      animation: "$loading 1s ease-in-out infinite"
    }
  }
}))

export const RowLoading = ({ height }) => {
  const classes = useStyles({ height })

  return (
    <tr className={classes.root}>
      <td className={classes.row} />
    </tr>
  )
}
