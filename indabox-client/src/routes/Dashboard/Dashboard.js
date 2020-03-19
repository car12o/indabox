// import React, { useState } from "react"
import React from "react"
import { makeStyles } from "@material-ui/core/styles"
// import { Paper, Tabs, Tab } from "@material-ui/core"
import { Paper } from "@material-ui/core"
import { Title } from "../../components/Title/Title"
// import { Table } from "../../components/Table/Table"

const useStyles = makeStyles((theme) => ({
  root: {
    background: "#fff"
  },
  tabs: {
    color: theme.palette.secondary.main
  },
  tabSelected: {
    fontWeight: "bold"
  }
}))

// ##################################################################
// const columns = [
//   { id: "name", numeric: false, disablePadding: true, label: "Dessert (100g serving)" },
//   { id: "calories", numeric: false, disablePadding: false, label: "Calories" },
//   { id: "fat", numeric: false, disablePadding: false, label: "Fat (g)" },
//   { id: "carbs", numeric: false, disablePadding: false, label: "Carbs (g)" },
//   { id: "protein", numeric: false, disablePadding: false, label: "Protein (g)" }
// ]

// let counter = 0
// function createData(name, calories, fat, carbs, protein) {
//   counter += 1
//   return { id: counter, name, calories, fat, carbs, protein }
// }

// const data = [
//   createData("Cupcake", 305, 3.7, 67, 4.3),
//   createData("Donut", 452, 25.0, 51, 4.9),
//   createData("Eclair", 262, 16.0, 24, 6.0),
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData("Gingerbread", 356, 16.0, 49, 3.9),
//   createData("Honeycomb", 408, 3.2, 87, 6.5),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   createData("Jelly Bean", 375, 0.0, 94, 0.0),
//   createData("KitKat", 518, 26.0, 65, 7.0),
//   createData("Lollipop", 392, 0.2, 98, 0.0),
//   createData("Marshmallow", 318, 0, 81, 2.0),
//   createData("Nougat", 360, 19.0, 9, 37.0),
//   createData("Oreo", 437, 18.0, 63, 4.0)
// ]

// const actions = [
//   { label: "Adicionar", onClick: (selected) => console.log(selected) },
//   { label: "Remover", onClick: (selected) => console.log(selected) }
// ]

// ##################################################################

export const Dashboard = () => {
  // const [index, setIndex] = useState(0)
  const classes = useStyles()

  return (
    <Paper className={classes.root} elevation={1}>
      <Title label="Administração" />
      {/* <Tabs
        value={index}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        onChange={(_, i) => setIndex(i)}
      >
        <Tab
          classes={{ textColorPrimary: classes.tabs, selected: classes.tabSelected }}
          label="Pagamentos recebidos"
        />
        <Tab
          classes={{ textColorPrimary: classes.tabs, selected: classes.tabSelected }}
          label="Pagamentos emitidos"
        />
        <Tab
          classes={{ textColorPrimary: classes.tabs, selected: classes.tabSelected }}
          label="Quotas em falta"
        />
      </Tabs>
      {index === 0 && <Table
        columns={columns}
        data={data}
        orderBy="name"
        // actions={actions}
        // onRowClick={(e) => console.log(e)}
        noDataLabel="Sem dados ..."
      />}
      {index === 1 && <Table
        columns={columns}
        data={data}
        orderBy="name"
        // actions={actions}
        // onRowClick={(e) => console.log(e)}
        noDataLabel="Sem dados ..."
      />}
      {index === 2 && <Table
        columns={columns}
        data={data}
        orderBy="name"
        // actions={actions}
        // onRowClick={(e) => console.log(e)}
        noDataLabel="Sem dados ..."
      />} */}
    </Paper >
  )
}
