import React from "react"
import { makeStyles, Dialog, DialogTitle, DialogContent, Button } from "@material-ui/core"

const useStyles = makeStyles({
  title: {
    width: "400px",
    color: "white",
    margin: "0px"
  },
  content: {
    display: "flex",
    flexDirection: "column",
    fontSize: "16px",
    "&>*": {
      textAlign: "center"
    }
  },
  lastSpan: {
    marginTop: "15px"
  },
  actions: {
    margin: "30px 0 5px 0",
    "&>*": {
      margin: "0px 25px"
    }
  }
})

export const HeaderModal = ({ open, setOpen, deletedUser }) => {
  const classes = useStyles()

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
    >
      <DialogTitle classes={{ root: "gradient-background" }}>
        <p className={classes.title}>Alerta</p>
      </DialogTitle>
      <DialogContent classes={{ root: classes.content }}>
        <span>A inativacao de um utilizador é uma ação definitiva,</span>
        <span>não podera voltar a activar.</span>
        <span className={classes.lastSpan}>Pretende prosseguir com a inativação?</span>
        <div className={classes.actions}>
          <Button
            color="primary"
            size="large"
            variant="contained"
            onClick={() => deletedUser()}
          >
            Sim
          </Button>
          <Button
            color="primary"
            size="large"
            variant="contained"
            onClick={() => setOpen(false)}
          >
            Não
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
