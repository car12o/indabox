import React, { Component } from "react"
import classNames from "classnames"
import { withStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import ArrowForwardIcon from "@material-ui/icons/ArrowForward"
import SwipeableViews from "react-swipeable-views"
import AppBar from "@material-ui/core/AppBar"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Stamp from "../Stamp/stamp"
import Identification from "./Identification/identification"
import Contact from "./Contact/contact"
import Notes from "./Notes/notes"
import Payments from "./Payments/payments"
import TableSelect from "../TableSelect/tableSelect"
import TabContainer from "./TabContainer/tabContainer"

function PaperHeader({ profile, partner, classes }) {
  if (profile) {
    return (
      <span className={classes.breadcrum}>
        {`${partner.firstName.value} ${partner.lastName.value}`}
      </span>
    )
  }
  return (
    <span className={classes.breadcrum}>
      Sócios <ArrowForwardIcon className={classes.breadcrumIcon} />
      {`${partner.firstName.value} ${partner.lastName.value}`}
    </span>
  )
}

const quotasRows = [
  { id: "year", numeric: false, disablePadding: false, label: "ANO" },
  {
    id: "payment.status.label",
    numeric: false,
    disablePadding: false,
    label: "ESTADO",
    default: "Por pagar",
    color: true
  },
  { id: "value", numeric: false, disablePadding: false, label: "VALOR", symbol: "€" },
  { id: "payment.createdAt", numeric: false, disablePadding: false, label: "DATA DE CRIAÇÃO", default: "" },
  { id: "payment.paymentDate", numeric: false, disablePadding: false, label: "DATA DE PAGAMENTO", default: "" }
]

const styles = (theme) => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  },
  breadcrum: {
    display: "flex"
  },
  breadcrumIcon: {
    alignSelf: "center",
    margin: "0 6px",
    fill: theme.palette.secondary.light
  },
  stampsContainer: {
    display: "flex",
    marginTop: "25px"
  },
  stampsRow: {
    width: "300px"
  },
  stampsLast: {
    marginLeft: "100px"
  },
  tabsWrapper: {
    backgroundColor: theme.palette.background.paper,
    width: "100%",
    marginTop: "25px",
    boxShadow: "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)"
  },
  tabContainer: {
    height: "760px"
  },
  tabContainerBody: {
    height: "695px"
  },
  emptyDataTitle: {
    padding: "30px 15px",
    fontSize: "16px"
  },
  tabsAppBar: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: "none"
  },
  tab: {
    color: theme.palette.secondary.main
  },
  tabSelected: {
    fontWeight: "bold"
  }
})

class Partner extends Component {
  state = {
    quotes: {
      selected: []
    }
  }

  render() {
    const { classes, partner, profile, tab, handleChange, setProperty, togglePartnerQuoteSelected,
      setPaymentInvoiceStatus, identificationTab, contactsTab, notesTab, quotasTab, paymentsTab } = this.props

    const theme = {
      direction: "ltl"
    }

    const selectedQuotes = partner.quotas.reduce((accum, quote) => {
      if (quote.selected) {
        accum.push(quote.id)
      }
      return accum
    }, [])

    return (
      <div className={classes.container}>
        <Paper className={classes.root} elevation={1}>
          <Typography className={classes.breadcrum} variant="h6" id="tableTitle">
            <PaperHeader classes={classes} partner={partner} profile={profile} />
          </Typography>
          <div className={classes.stampsContainer}>
            <div className={classes.stampsRow}>
              <Stamp
                label="Adicionado por"
                value={partner.createdBy}
              />
              <Stamp
                label="em"
                value={partner.createdAt}
              />
            </div>
            <div className={classNames(classes.stampsRow, classes.stampsLast)}>
              <Stamp
                label="Actualizado por"
                value={partner.updatedBy}
              />
              <Stamp
                label="em"
                value={partner.updatedAt}
              />
            </div>
          </div>
        </Paper>

        <div className={classes.tabsWrapper}>
          <AppBar className={classes.tabsAppBar} position="static" color="default">
            <Tabs
              value={tab}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
            >
              <Tab
                classes={{ textColorPrimary: classes.tab, selected: classes.tabSelected }}
                label="Quotas"
              />
              <Tab
                classes={{ textColorPrimary: classes.tab, selected: classes.tabSelected }}
                label="Pagamentos"
              />
              <Tab
                classes={{ textColorPrimary: classes.tab, selected: classes.tabSelected }}
                label="Identificação"
              />
              <Tab
                classes={{ textColorPrimary: classes.tab, selected: classes.tabSelected }}
                label="Contactos"
              />
              <Tab
                classes={{ textColorPrimary: classes.tab, selected: classes.tabSelected }}
                label="Notas"
              />
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={tab}
          >
            <TabContainer
              classes={{ root: classes.tabContainer, body: classes.tabContainerBody }}
              selected={selectedQuotes}
              buttons={quotasTab.buttons}
              disabled={!selectedQuotes.length}
            >
              {partner.quotas.length > 0
                ? <TableSelect
                  rows={quotasRows}
                  data={partner.quotas}
                  onClick={() => { }}
                  selected={selectedQuotes}
                  isSelectable={(quota) => !quota.payment}
                  onSelect={(ids) => togglePartnerQuoteSelected(ids)}
                  order="desc"
                  orderBy="year"
                  rowsPerPageOptions={[12]}
                />
                : <Typography classes={{ root: classes.emptyDataTitle }}>Nao existem quotas ...</Typography>}
            </TabContainer>
            <TabContainer classes={{ root: classes.tabContainer }}>
              <Payments
                setPaymentInvoiceStatus={setPaymentInvoiceStatus}
                data={partner.payments}
                paymentActions={paymentsTab}
              />
            </TabContainer>
            <TabContainer
              classes={{ root: classes.tabContainer, body: classes.tabContainerBody }}
              buttons={identificationTab.buttons}
              selected={identificationTab.action}
            >
              <Identification
                partner={partner}
                setProperty={setProperty}
                disabled={identificationTab.disabled}
              />
            </TabContainer>
            <TabContainer
              classes={{ root: classes.tabContainer, body: classes.tabContainerBody }}
              buttons={contactsTab.buttons}
              selected={contactsTab.action}
            >
              <Contact
                partner={partner}
                setProperty={setProperty}
                disabled={contactsTab.disabled}
              />
            </TabContainer>
            <TabContainer
              classes={{ root: classes.tabContainer, body: classes.tabContainerBody }}
              buttons={notesTab.buttons}
              selected={notesTab.action}
            >
              <Notes
                partner={partner}
                setProperty={setProperty}
                disabled={notesTab.disabled}
              />
            </TabContainer>
          </SwipeableViews>
        </div>
      </div >
    )
  }
}

export default withStyles(styles)(Partner)
