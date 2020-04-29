import React from "react"
import { isUndefined } from "lodash/fp"
import { Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { MenuOptions } from "../MenuOptions/MenuOptions"
import { Input } from "../Input/Input"

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "25px 35px"
  },
  label: {
    flexGrow: 2
  },
  search: {
    flexGrow: 1,
    width: "200px",
    padding: "0 100px",
    margin: 0
  },
  button: {
    padding: 0
  }
})

export const Title = ({ label, search, onSearch, options }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Typography classes={{ root: classes.label }} variant="h6" id="tableTitle">
        {label}
      </Typography>
      {!isUndefined(search) && (
        <Input
          classes={{ container: classes.search }}
          label="Pesquisar"
          value={search}
          onChange={onSearch}
        />
      )}
      {options && (
        <MenuOptions classes={classes} options={options} />
      )}
    </div>
  )
}
