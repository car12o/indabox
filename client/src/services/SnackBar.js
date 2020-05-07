import React, { useState, createContext, useContext } from "react"
import { makeStyles, Snackbar as MuiSnackbar, Slide, Typography } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.primary.main,
    width: "400px"
  }
}))

const SnackbarContext = createContext({})

const SnackbarContent = ({ message }) => {
  const [title, ...body] = message.split("\n")
  return (
    <>
      <Typography variant="body1">
        {title}
      </Typography>
      {body.map((msg) => (
        <Typography key={msg} variant="body2">
          {msg}
        </Typography>
      ))}
    </>
  )
}

export const SnackbarProvider = ({ children }) => {
  const [{ open, message }, setState] = useState({ open: false })
  const classes = useStyles()

  return (
    <SnackbarContext.Provider value={{
      notify: (message) => setState({ open: true, message })
    }}>
      <MuiSnackbar
        classes={classes}
        key={message}
        open={open}
        onClose={() => setState({ open: false })}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        autoHideDuration={5000}
        TransitionComponent={(props) => <Slide {...props} classes={classes} direction="left" />}
        message={<SnackbarContent message={message} />}
      />
      {children}
    </SnackbarContext.Provider >
  )
}

export const useSnackbar = () => useContext(SnackbarContext)
