import React, { Component } from "react"
import classNames from "classnames"
import { withStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import Dropdown from "../../DropDown/dropDown"
import PaymentModal from "../PaymentModal/paymentModal"
import "./styles.css"

const invoices = [
  { label: "Emitida", value: true },
  { label: "Não emitida", value: false }
]

const styles = {
  root: {
    width: "100%",
    backgroundColor: "transparent",
    overflowX: "auto",
    boxShadow: "none"
  },
  emptyDataTitle: {
    padding: "30px 15px",
    fontSize: "16px"
  },
  tableHead: {
    color: "white",
    fontSize: "14px"
  },
  tableRow: {
    "&:hover": {
      cursor: "pointer",
      backgroundColor: "rgba(0, 0, 0, 0.07)"
    }
  },
  lastCell: {
    paddingRight: "120px !important"
  },
  dropdown: {
    marginBottom: "-5px"
  }
}

class Quotas extends Component {
  state = {
    modal: {
      open: false
    }
  }

  render() {
    const { classes, data, setPaymentInvoiceStatus, paymentActions } = this.props

    if (data.length < 1) {
      return (
        <Typography classes={{ root: classes.emptyDataTitle }}>Nao existem pagamentos ...</Typography>
      )
    }

    return (
      <Paper id="quotas-component" className={classes.root}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell classes={{ root: classes.tableHead }} align="right">TIPO</TableCell>
              <TableCell classes={{ root: classes.tableHead }} align="right">CRIADO POR</TableCell>
              <TableCell classes={{ root: classes.tableHead }} align="right">QUOTAS</TableCell>
              <TableCell classes={{ root: classes.tableHead }} align="right">ESTADO</TableCell>
              <TableCell classes={{ root: classes.tableHead }} align="right">TOTAL</TableCell>
              <TableCell
                classes={{ root: classNames(classes.tableHead, classes.lastCell) }}
                align="right">
                FACTURA
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, i) => (
              <TableRow key={i} className={classes.tableRow} onClick={() => this.setState({
                modal: {
                  open: true,
                  payment: row
                }
              })}>
                <TableCell component="th" scope="row" align="right" >
                  {row.type}
                </TableCell>
                <TableCell align="right">{row.createdBy}</TableCell>
                <TableCell align="right">{row.quotas.map((quota) => quota.year).join(",")}</TableCell>
                <TableCell align="right">{row.status.label}</TableCell>
                <TableCell align="right">{row.value}€</TableCell>
                <TableCell className={classes.lastCell} align="right" onClick={(e) => e.stopPropagation()}>
                  <Dropdown
                    classes={{ container: classes.dropdown }}
                    inputClasses={{ fontSize: "13px" }}
                    value={row.invoiceEmited}
                    onChange={(value) => setPaymentInvoiceStatus(row.id, value)}
                    options={invoices}
                    variant="standard"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <PaymentModal
          open={this.state.modal.open}
          payment={this.state.modal.payment}
          paymentActions={paymentActions}
          onClose={() => this.setState({
            modal: {
              open: false
            }
          })}
        />
      </Paper>
    )
  }
}

export default withStyles(styles)(Quotas)
