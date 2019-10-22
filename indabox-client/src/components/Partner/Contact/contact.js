import React, { Component } from "react"
import classNames from "classnames"
import { withStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import request from "../../../services/request"
import RadioGroup from "../../RadioGroup/radioGroup"
import Input from "../../Input/input"
import DropDown from "../../DropDown/dropDown"
import "./styles.css"


const styles = {
  root: {
    display: "flex",
    flexDirection: "column"
  },
  title: {
    padding: "18px 30px",
    fontSize: "14px",
    marginBottom: "15px",
    color: "white"
  },
  formControlLabel: {
    paddingLeft: "50px"
  },
  container: {
    display: "flex"
  },
  column: {
    width: "100%",
    padding: "10px 50px"
  },
  columnTitle: {
    fontSize: "16px",
    padding: "15px 0"
  },
  hide: {
    visibility: "hidden"
  },
  row: {
    display: "flex",
    flexDirection: "row"
  },
  dropdown: {
    margin: "0 0 28px 0"
  },
  rowInput: {
    marginRight: "20px"
  }
}

class PartnerDetails extends Component {
  static get(url, handler) {
    request({
      url,
      method: "GET"
    })((res) => handler(res))
  }

  setCountries(res) {
    if (res.status === 200) {
      this.setState({
        countries: res.body.countries.map((country) => ({ label: country, value: country }))
      })
    }
  }

  componentWillMount() {
    PartnerDetails.get("/countries", this.setCountries.bind(this))
  }

  state = {
    countries: []
  }

  render() {
    const { classes, partner, setProperty, disabled } = this.props

    return (
      <div id="partner-details" className={classes.root}>
        <Typography classes={{ root: classes.title }}>CONTACTOS</Typography>
        <RadioGroup
          value={partner.billing.active.toString()}
          handleChange={(value) => setProperty("billing.active", value === "true")}
          disabled={disabled}
          formControlLabels={[
            {
              classes: classes.formControlLabel,
              value: "false",
              label: "Faturar com esta morada"
            },
            {
              value: "true",
              label: "Faturar noutro nome"
            }
          ]}
        />
        <div className={classes.container}>
          <div className={classes.column}>
            <Typography classes={{ root: classes.columnTitle }} color="secondary" >
              Dados pessoais
            </Typography>
            <Input
              type="text"
              classes={{ container: classes.input }}
              label={partner.address.road.label}
              value={partner.address.road.value}
              onChange={(value) => setProperty("address.road", value)}
              error={partner.address.road.error}
              disabled={disabled}
            />
            <div className={classes.row}>
              <Input
                type="text"
                classes={{ container: classes.rowInput }}
                label={partner.address.postCode.label}
                value={partner.address.postCode.value}
                onChange={(value) => setProperty("address.postCode", value)}
                error={partner.address.postCode.error}
                disabled={disabled}
              />
              <Input
                type="text"
                label={partner.address.city.label}
                value={partner.address.city.value}
                onChange={(value) => setProperty("address.city", value)}
                error={partner.address.city.error}
                disabled={disabled}
              />
            </div>
            <DropDown
              classes={{ container: classes.dropdown }}
              label={partner.address.country.label}
              value={partner.address.country.value}
              onChange={(value) => setProperty("address.country", value)}
              options={this.state.countries}
              disabled={disabled}
            />
            <Input
              type="text"
              label={partner.mobile.label}
              value={partner.mobile.value}
              onChange={(value) => setProperty("mobile", value)}
              error={partner.mobile.error}
              disabled={disabled}
            />
            <Input
              type="text"
              classes={{ container: classes.rowInput }}
              label={partner.phone.label}
              value={partner.phone.value}
              onChange={(value) => setProperty("phone", value)}
              error={partner.phone.error}
              disabled={disabled}
            />
          </div>
          <div className={classNames(
            classes.column,
            { [classes.hide]: !partner.billing.active },
          )}>
            <Typography classes={{ root: classes.columnTitle }} color="secondary" >
              Dados de faturação
            </Typography>
            <Input
              type="text"
              classes={{ container: classes.rowInput }}
              label={partner.billing.name.label}
              value={partner.billing.name.value}
              onChange={(value) => setProperty("billing.name", value)}
              error={partner.billing.name.error}
              disabled={disabled}
            />
            <Input
              type="text"
              classes={{ container: classes.rowInput }}
              label={partner.billing.nif.label}
              value={partner.billing.nif.value}
              onChange={(value) => setProperty("billing.nif", value)}
              error={partner.billing.nif.error}
              disabled={disabled}
            />
            <Input
              type="text"
              classes={{ container: classes.row }}
              label={partner.billing.address.road.label}
              value={partner.billing.address.road.value}
              onChange={(value) => setProperty("billing.address.road", value)}
              error={partner.billing.address.road.error}
              disabled={disabled}
            />
            <div className={classes.row}>
              <Input
                type="text"
                classes={{ container: classes.rowInput }}
                label={partner.billing.address.postCode.label}
                value={partner.billing.address.postCode.value}
                onChange={(value) => setProperty("billing.address.postCode", value)}
                error={partner.billing.address.postCode.error}
                disabled={disabled}
              />
              <Input
                type="text"
                label={partner.billing.address.city.label}
                value={partner.billing.address.city.value}
                onChange={(value) => setProperty("billing.address.city", value)}
                error={partner.billing.address.city.error}
                disabled={disabled}
              />
            </div>
            <DropDown
              classes={{ container: classes.dropdown }}
              label={partner.billing.address.country.label}
              value={partner.billing.address.country.value}
              onChange={(value) => setProperty("billing.address.country", value)}
              options={this.state.countries}
              disabled={disabled}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(PartnerDetails)
