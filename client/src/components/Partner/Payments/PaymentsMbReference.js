import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Button } from "@material-ui/core"
import { del } from "../../../services/api"
import { Stamp } from "../../Stamp/Stamp"

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column"
  },
  container: {
    margin: "0 50px 40px 50px",
    padding: "0 25px"
  },
  image: {
    width: "150px",
    marginTop: "30px"
  },
  label: {
    textAlign: "start",
    width: "auto"
  },
  button: {
    width: "50%",
    alignSelf: "center",
    margin: "15px 0"
  }
})

export const MbReference = ({ data, onClose, updateUser }) => {
  const classes = useStyles()

  const cancelPayment = async () => {
    const { body } = await del(`/payments/${data.payment.id}`)
    updateUser(body)
    onClose()
  }

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Stamp
          classes={{ label: classes.label }}
          label={<img className={classes.image} src="/assets/mb.png" alt="" />}
        />
        <Stamp
          classes={{ label: classes.label }}
          label="Entidade:"
          value={data.ententy}
        />
        <Stamp
          classes={{ label: classes.label }}
          label="Referência:"
          value={data.reference}
        />
        <Stamp
          classes={{ label: classes.label }}
          label="Valor:"
          value={`${data.value}€`}
        />
        <Stamp />
      </div>
      {data.payment.status === 0 && (
        <Button
          classes={{ root: classes.button }}
          color="primary"
          size="large"
          variant="contained"
          onClick={cancelPayment}
        >
          Cancelar referencia MB
        </Button>
      )}
    </div>
  )
}

MbReference.defaultProps = {
  data: {}
}
