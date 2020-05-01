import React from "react"
import { MuiPickersUtilsProvider, DatePicker as MuiDatePicker } from "@material-ui/pickers"
import DateFnsUtils from "@date-io/date-fns"

export const DatePicker = () => (
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <MuiDatePicker
      value={new Date()}
      onChange={(...args) => console.log(args)}
    />
  </MuiPickersUtilsProvider>
)
