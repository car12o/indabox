import React, { Component } from "react"
import { connect } from "react-redux"
import { setUserProperty, login } from "../../store/actions/user"
import { withStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import Input from "../../components/Input/input"
import s from "./style.css"

const styles = {
  label: {
    margin: "20px 0"
  },
  button: {
    marginTop: "15px"
  }
}

class Login extends Component {
  enterEventListener(event) {
    const { keyCode } = event
    if (keyCode === 13) {
      const { user, login } = this.props
      login(user.email.value, user.password.value)
    }
  }

  componentWillMount() {
    const { user, history } = this.props
    if (user.logged) {
      return history.push("/")
    }
  }

  componentDidMount() {
    this.forceUpdate()
  }

  componentWillUpdate(props) {
    const { user, history } = props
    if (user.logged) {
      return history.push("/")
    }
  }

  render() {
    const { classes, user, setProperty, login } = this.props

    return (
      <Paper className={s.container} elevation={1} onKeyUp={e => this.enterEventListener(e)}>
        <img className={s.logo} src="/assets/logo.png" alt="" />
        <Typography className={classes.label} color="secondary" variant="subtitle1">
          INICIAR SESSÃO
        </Typography>
        <Input
          label={user.email.label}
          value={user.email.value}
          onChange={value => setProperty("email", value)}
          error={user.email.error}
        />
        <Input
          type="password"
          label={user.password.label}
          value={user.password.value}
          onChange={value => setProperty("password", value)}
          error={user.password.error}
        />
        <Button classes={{ contained: classes.button }} color="primary" size="large" variant="contained"
          onClick={() => login(user.email.value, user.password.value)}>
          Iniciar sessão
        </Button>
      </Paper>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  setProperty: (...args) => dispatch(setUserProperty(...args)),
  login: (...args) => dispatch(login(...args))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login))
