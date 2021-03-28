import React, { useEffect } from "react"
import { makeStyles, Dialog, DialogTitle, DialogContent } from "@material-ui/core"
import { useApi } from "../../../services/Api"
import { useSnackbar } from "../../../services/SnackBar"
import { PageLoading } from "../../../components/PageLoading/PageLoading"

const useStyles = makeStyles({
  title: {
    width: "570px",
    color: "white",
    margin: "0px"
  },
  loading: {
    height: "300px"
  }
})

export const ExcelExport = ({ open, onClose }) => {
  const classes = useStyles()
  const api = useApi()
  const { notify } = useSnackbar()

  const fetchExcel = async () => {
    try {
      const { body } = await api.getFile("/excel")
      const url = window.URL.createObjectURL(new Blob([body]))
      const link = document.createElement("a")
      link.href = url
      link.setAttribute("type", "hidden")
      link.setAttribute("download", "socios.xlsx")
      document.body.appendChild(link)
      link.click()
      link.parentNode.removeChild(link)
    } catch (error) {
      notify(error.message)
    }
    onClose()
  }

  useEffect(() => {
    if (open) fetchExcel()
  }, [open])

  return (
    <Dialog
      maxWidth="xl"
      aria-labelledby="simple-dialog-title"
      onClose={() => { }}
      open={open}
    >
      <DialogTitle classes={{ root: "gradient-background" }}>
        <p className={classes.title}>A exportar para excel, por favor aguarde...</p>
      </DialogTitle>
      <DialogContent>
        <PageLoading className={classes.loading} />
      </DialogContent>
    </Dialog>
  )
}
