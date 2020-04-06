import React from "react"
import { makeStyles, Typography } from "@material-ui/core"
import { Dropdown } from "../../../components/Dropdown/Dropdown"
import { Stamp } from "../../../components/Stamp/Stamp"
import { Chart } from "./Chart"

const useStyles = makeStyles({
  section: {
    display: "flex",
    padding: "20px 35px"
  },
  sectionLeft: {
    width: "45%",
    display: "flex",
    justifyContent: "space-between"
  },
  sectionRight: {
    width: "55%"
  },
  formControl: {
    width: "200px"
  },
  stampContainer: {
    display: "flex",
    flexDirection: "column",
    padding: "30px 100px 0 0"
  },
  stampRoot: {
    display: "flex",
    marginBottom: "15px"
  },
  stampFirst: {
    marginBottom: "35px"
  },
  stamp: {
    width: "auto",
    minWidth: "auto",
    textAlign: "start"
  }
})

export const Header = ({ totals, filter, setState }) => {
  const classes = useStyles()

  return (
    <div className={classes.section}>
      <div className={classes.sectionLeft}>
        <Typography variant="h6" id="tableTitle">
          Administração
        </Typography>
        <div className={classes.stampContainer}>
          <Stamp
            classes={{ root: `${classes.stampRoot} ${classes.stampFirst}`, label: classes.stamp, value: classes.stamp }}
            label="Total socios"
            value={totals.users}
          />
          <Dropdown
            classes={{ formControl: classes.formControl }}
            label="Ano"
            value={filter.year}
            options={[
              { label: "Todos", value: 0 },
              { label: 2020, value: 2020 },
              { label: 2019, value: 2019 },
              { label: 2018, value: 2018 },
              { label: 2017, value: 2017 },
              { label: 2016, value: 2016 },
              { label: 2015, value: 2015 },
              { label: 2014, value: 2014 },
              { label: 2013, value: 2013 },
              { label: 2012, value: 2012 },
              { label: 2011, value: 2011 },
              { label: 2010, value: 2010 }
            ]}
            onChange={(year) => setState({ filter: { ...filter, year } })}
          />
          <Stamp
            classes={{ root: classes.stampRoot, label: classes.stamp, value: classes.stamp }}
            label="Pagamentos recebidos"
            value={totals.paymentReceived}
          />
          <Stamp
            classes={{ root: classes.stampRoot, label: classes.stamp, value: classes.stamp }}
            label="Aguardar pagamento"
            value={totals.paymentWaiting}
          />
          <Stamp
            classes={{ root: classes.stampRoot, label: classes.stamp, value: classes.stamp }}
            label="Quotas sem pagamento"
            value={totals.paymentMissing}
          />
        </div>
      </div>
      <div className={classes.sectionRight}>
        <Chart totals={totals} width="550" />
      </div>
    </div>
  )
}