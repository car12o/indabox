import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { useApi } from "../../services/api"
import { Dropdown } from "../Dropdown/Dropdown"

const useStyles = makeStyles({
  invoice: {
    width: "auto",
    maxHeight: "26px",
    marginBottom: 0,
    "&::before": {
      borderBottom: 0
    }
  },
  input: {
    fontSize: "13px",
    "&::before": {
      borderBottom: 0
    }
  }
})

export const Invoice = ({ id, status, onPaymentUpdate }) => {
  const classes = useStyles()
  const api = useApi()

  const update = async (invoiceEmited) => {
    const { body: payment } = await api.put(`/payments/${id}`, { invoiceEmited })
    onPaymentUpdate({ payment })
  }

  return (
    <Dropdown
      classes={{ formControl: classes.invoice, input: classes.input }}
      value={status}
      onChange={(value) => update(value)}
      options={[
        { label: "Emitida", value: true },
        { label: "Não emitida", value: false }
      ]}
    />
  )
}
