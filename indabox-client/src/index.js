import React from "react"
import ReactDOM from "react-dom"
import { CssBaseline } from "@material-ui/core"
import { ThemeProvider } from "@material-ui/core/styles"
import { App } from "./App"
import { Provider } from "./store"
import { theme } from "./theme"
import "./styles.css"

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Provider>
      <App />
    </Provider>
  </ThemeProvider>,
  document.getElementById("root")
)
