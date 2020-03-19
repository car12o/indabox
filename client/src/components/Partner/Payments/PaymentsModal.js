import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Dialog, DialogTitle, DialogContent } from "@material-ui/core"
import { Stamp } from "../../Stamp/Stamp"
import { MbReference } from "./PaymentsMbReference"

const useStyles = makeStyles({
  title: {
    width: "570px",
    color: "white",
    margin: "0px"
  },
  row: {
    display: "flex",
    margin: "15px 0"
  },
  minWidth: {
    minWidth: "10px"
  }
})

export const PaymentsModal = ({ open, onClose, payment, updateUser }) => {
  const classes = useStyles()

  return (
    <Dialog
      aria-labelledby="simple-dialog-title"
      onClose={onClose}
      open={open}
    >
      <DialogTitle classes={{ root: "gradient-background" }}>
        <p className={classes.title}>Detalhes do pagamento</p>
      </DialogTitle>
      <DialogContent>
        <div className={classes.row}>
          <Stamp
            classes={{ label: classes.minWidth, value: classes.minWidth }}
            label="Criado por:"
            value={payment.createdBy}
          />
          <Stamp
            classes={{ label: classes.minWidth, value: classes.minWidth }}
            label="Tipo:"
            value={payment.type}
          />
        </div>
        <div className={classes.row}>
          <Stamp
            classes={{ label: classes.minWidth, value: classes.minWidth }}
            label="Data criação:"
            value={payment.createdAt}
          />
          <Stamp
            classes={{ label: classes.minWidth, value: classes.minWidth }}
            label="Data pagamento:"
            value={payment.paymentDate}
          />
        </div>
        <div className={classes.row}>
          <Stamp
            classes={{ label: classes.minWidth, value: classes.minWidth }}
            label="Estado:"
            value={payment.status}
          />
          <Stamp
            classes={{ label: classes.minWidth, value: classes.minWidth }}
            label={payment.deletedAt && "Data cancelamento:"}
            value={payment.deletedAt}
          />
        </div>
        <div className={classes.row}>
          <Stamp
            classes={{ label: classes.minWidth, value: classes.minWidth }}
            label="Quotas:"
            value={payment.quotas}
          />
          <Stamp
            classes={{ label: classes.minWidth, value: classes.minWidth }}
            label="Valor total:"
            value={payment.value}
          />
        </div>
        {payment.mbReference && (
          <MbReference
            classes={{ row: classes.row }}
            data={{
              ...payment.mbReference,
              payment: {
                id: payment._id,
                status: payment.statusValue
              }
            }}
            onClose={onClose}
            updateUser={updateUser}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}

PaymentsModal.defaultProps = {
  payment: {}
}
