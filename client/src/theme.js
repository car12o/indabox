import { createMuiTheme } from "@material-ui/core/styles"

export const theme = createMuiTheme({
  palette: {
    primary: { main: "#DA2155", dark: "#9F0B87" },
    secondary: { main: "#525F7E", light: "#E5E5E5" },
    text: {
      primary: "#323C4E",
      secondary: "#DA2155"
    },
    background: {
      default: "#F0F2F4"
    }
  },
  overrides: {
    MuiTableCell: {
      root: { padding: "14px" }
    },
    MuiListItemText: {
      root: { color: "#525F7E" }
    }
  }
})
