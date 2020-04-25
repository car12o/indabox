import React from "react"
import { makeStyles, Dialog, DialogTitle, DialogContent } from "@material-ui/core"
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

export const PaymentsModal = ({ open, onClose, payment, updatePaymentAndQuotas }) => {
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
            value={payment.statusText}
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
        {payment.mb && (
          <MbReference
            classes={{ row: classes.row }}
            data={{
              ...payment.mb,
              paymentId: payment._id,
              value: payment.value,
              status: payment.status
            }}
            onClose={onClose}
            updatePaymentAndQuotas={updatePaymentAndQuotas}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}

PaymentsModal.defaultProps = {
  payment: {}
}
