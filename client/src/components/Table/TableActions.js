import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Button } from "@material-ui/core"

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    padding: "20px 0"
  },
  button: {
    margin: "0 20px"
  }
})

export const TableActions = ({ actions, selected, setSelected }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      {actions.map((action, i) => (
        <Button
          key={i}
          classes={{ root: classes.button }}
          color="primary"
          size="large"
          variant="contained"
          disabled={selected.length === 0}
          onClick={() => {
            setSelected([])
            action.onClick(selected)
          }}
        >
          {action.label}
        </Button>
      ))}
    </div>
  )
}
