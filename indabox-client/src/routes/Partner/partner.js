import React, { Component } from "react"
import { connect } from "react-redux"
import LinearProgress from "@material-ui/core/LinearProgress"
import {
  getPartner, setPartnerProperty, setPaymentInvoiceStatus, generatePayment, updatePartnerIdentification,
  updatePartnerContact, updatePartnerNotes, togglePartnerQuoteSelected, cancelPayment
} from "../../store/actions/partners"
import PartnerComponent from "../../components/Partner/partner"

class Partner extends Component {
  view(key) {
    return [
      { label: "Voltar", color: "secondary", fn: () => this.props.history.goBack() },
      {
        label: "Editar",
        color: "primary",
        fn: () => {
          this.setState({
            [key]: {
              disabled: false,
              buttons: this.edit(key),
              action: this.state[key].action
            }
          })
        }
      }
    ]
  }

  edit(key) {
    return [
      {
        label: "Cancelar",
        color: "secondary",
        fn: () => {
          this.props.getPartner(this.props.partner.id)
          this.setState({
            [key]: {
              disabled: true,
              buttons: this.view(key),
              action: this.state[key].action
            }
          })
        }
      },
      {
        label: "Gravar",
        color: "primary",
        fn: (action) => {
          this.props[action](this.props.partner)
          this.setState({
            [key]: {
              disabled: true,
              buttons: this.view(key),
              action: this.state[key].action
            }
          })
        }
      }
    ]
  }

  initialState(tab) {
    return {
      tab,
      loading: false,
      identification: {
        disabled: true,
        buttons: this.view("identification"),
        action: "updatePartnerIdentification"
      },
      contacts: {
        disabled: true,
        buttons: this.view("contacts"),
        action: "updatePartnerContact"
      },
      notes: {
        disabled: true,
        buttons: this.view("notes"),
        action: "updatePartnerNotes"
      },
      quotas: {
        buttons: [
          {
            label: "Pagar manualmente",
            color: "primary",
            fn: (quotas) => this.props.generatePayment("Manual", quotas)
          },
          {
            label: "Gerar referencia MB",
            color: "primary",
            fn: (quotas) => this.props.generatePayment("Referencia MB", quotas)
          }
        ]
      },
      payments: {
        buttons: [
          {
            label: "Cancelar referencia MB",
            color: "primary",
            fn: ({ onClose, id }) => {
              this.props.cancelPayment(id)
              onClose()
            }
          }
        ]
      }
    }
  }

  async componentWillMount() {
    const { match, getPartner: _getPartner } = this.props

    this.setState({ loading: true })
    await _getPartner(match.params.id)
    this.setState({ loading: false })
  }

  state = this.initialState(0)

  handleChange = (event, tab) => {
    this.setState(this.initialState(tab))
  }

  render() {
    if (this.state.loading) {
      return (<LinearProgress />)
    }

    const {
      partner,
      setProperty,
      togglePartnerQuoteSelected: _togglePartnerQuoteSelected,
      setPaymentInvoiceStatus: _setPaymentInvoiceStatus
    } = this.props

    return (
      <PartnerComponent
        tab={this.state.tab}
        partner={partner}
        handleChange={this.handleChange}
        setProperty={setProperty}
        togglePartnerQuoteSelected={_togglePartnerQuoteSelected}
        setPaymentInvoiceStatus={_setPaymentInvoiceStatus}
        identificationTab={this.state.identification}
        contactsTab={this.state.contacts}
        notesTab={this.state.notes}
        quotasTab={this.state.quotas}
        paymentsTab={this.state.payments}
      />
    )
  }
}

const mapStateToProps = (state) => ({
  partner: state.partners.selected
})

const mapDispatchToProps = (dispatch) => ({
  getPartner: (id) => dispatch(getPartner(id)),
  updatePartnerIdentification: (data) => dispatch(updatePartnerIdentification(data)),
  updatePartnerContact: (data) => dispatch(updatePartnerContact(data)),
  updatePartnerNotes: (data) => dispatch(updatePartnerNotes(data)),
  setProperty: (...args) => dispatch(setPartnerProperty(...args)),
  generatePayment: (...args) => dispatch(generatePayment(...args)),
  cancelPayment: (...args) => dispatch(cancelPayment(...args)),
  togglePartnerQuoteSelected: (...args) => dispatch(togglePartnerQuoteSelected(...args)),
  setPaymentInvoiceStatus: (...args) => dispatch(setPaymentInvoiceStatus(...args))
})

export default connect(mapStateToProps, mapDispatchToProps)(Partner)
