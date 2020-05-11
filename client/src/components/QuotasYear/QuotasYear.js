import React from "react"
import { compose, map, chunk } from "lodash/fp"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column"
  }
})

export const QuotasYear = ({ data }) => {
  const classes = useStyles()

  return compose(
    (result) => <span className={classes.root}>{result}</span>,
    map((values) => {
      const value = values.join(",")
      return <span key={value}>{value}</span>
    }),
    chunk(3)
  )(data)
}
