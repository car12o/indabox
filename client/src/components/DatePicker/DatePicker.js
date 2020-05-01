import React from "react"
import { makeStyles, InputAdornment } from "@material-ui/core"
import { CalendarToday } from "@material-ui/icons"
import { MuiPickersUtilsProvider, DatePicker as MuiDatePicker } from "@material-ui/pickers"
import DateFnsUtils from "@date-io/date-fns"
import { pt } from "date-fns/locale"

const useStyles = makeStyles({
  root: {
    cursor: "pointer",
    "&>*": {
      cursor: "pointer"
    }
  }
})

export const DatePicker = ({ label, value, onChange, disableFuture, disablePast, format, variant, orientation }) => {
  const classes = useStyles()

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={pt} >
      <MuiDatePicker
        classes={classes}
        label={label}
        value={value}
        onChange={onChange}
        autoOk
        disableFuture={disableFuture}
        disablePast={disablePast}
        format={format || "dd MMMM yyyy"}
        variant={variant || "inline"}
        orientation={orientation || "landscape"}
        InputProps={{
          className: classes.root,
          endAdornment: (
            <InputAdornment>
              <CalendarToday />
            </InputAdornment>
          )
        }}
      />
    </MuiPickersUtilsProvider>
  )
}
