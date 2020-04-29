import React from "react"
import { TableState } from "./TableState"
import { TableDynamic } from "./TableDynamic"

export const Table = ({ dynamic, ...props }) => {
  if (dynamic) {
    return <TableDynamic {...props} />
  }

  return <TableState {...props} />
}
