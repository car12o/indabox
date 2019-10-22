import React, { Component } from "react"
import { connect } from "react-redux"
import {
  setUserProperty, getUser, updateUserIdentification,
  updateUserContact, updateUserNotes
} from "../../store/actions/user"
// import {
//   getPartner, setPartnerProperty, setPaymentInvoiceStatus, generatePayment, updatePartnerIdentification,
//   updatePartnerContact, updatePartnerNotes, togglePartnerQuoteSelected, cancelPayment
// } from "../../store/actions/user"
import PartnerComponent from "../../components/Partner/partner"

class Profile extends Component {
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
          this.props.getUser(this.props.user.id)
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
          this.props[action](this.props.user)
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
      identification: {
        disabled: true,
        buttons: this.view("identification"),
        action: "updateUserIdentification"
      },
      contacts: {
        disabled: true,
        buttons: this.view("contacts"),
        action: "updateUserContact"
      },
      notes: {
        disabled: true,
        buttons: this.view("notes"),
        action: "updateUserNotes"
      },
      quotas: {
        buttons: null
      },
      payments: {
        buttons: null
      }
    }
  }

  // async componentWillMount() {
  //   const { match, getPartner: _getPartner } = this.props

  //   this.setState({ loading: true })
  //   await _getPartner(match.params.id)
  //   this.setState({ loading: false })
  // }

  state = this.initialState(0)

  handleChange = (event, tab) => {
    this.setState(this.initialState(tab))
  }

  render() {
    const {
      user,
      setProperty
      //   togglePartnerQuoteSelected: _togglePartnerQuoteSelected,
      //   setPaymentInvoiceStatus: _setPaymentInvoiceStatus
    } = this.props

    return (
      <PartnerComponent
        tab={this.state.tab}
        partner={user}
        handleChange={this.handleChange}
        setProperty={setProperty}
        //   togglePartnerQuoteSelected={_togglePartnerQuoteSelected}
        //   setPaymentInvoiceStatus={_setPaymentInvoiceStatus}
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
  user: state.user
})

const mapDispatchToProps = (dispatch) => ({
  getUser: (id) => dispatch(getUser(id)),
  updateUserIdentification: (data) => dispatch(updateUserIdentification(data)),
  updateUserContact: (data) => dispatch(updateUserContact(data)),
  updateUserNotes: (data) => dispatch(updateUserNotes(data)),
  setProperty: (...args) => dispatch(setUserProperty(...args))
  //   generatePayment: (...args) => dispatch(generatePayment(...args)),
  //   cancelPayment: (...args) => dispatch(cancelPayment(...args)),
  //   togglePartnerQuoteSelected: (...args) => dispatch(togglePartnerQuoteSelected(...args)),
  //   setPaymentInvoiceStatus: (...args) => dispatch(setPaymentInvoiceStatus(...args))
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
