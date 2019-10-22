/* eslint-disable class-methods-use-this */
import React, { Component } from "react"
import { connect } from "react-redux"
import { logout } from "../../store/actions/user"

class Logout extends Component {
  componentWillMount() {
    this.props.logout()
  }

  componentWillUpdate(props) {
    const { user, history } = props
    if (!user.logged) {
      history.push("/")
    }
  }

  render() {
    return (<span>Logout</span>)
  }
}


const mapStateToProps = (state) => ({
  user: state.user
})

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Logout)
