import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import ArrowForwardIcon from "@material-ui/icons/ArrowForward"
import { formatDate } from "../../services/transform"
import { Stamp } from "../Stamp/Stamp"

const useStyles = makeStyles((theme) => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    marginBottom: theme.spacing(3)
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
  }
}))

export const UserHeader = ({ user, breadcrumb }) => {
  const { firstName, lastName, createdBy, createdAt, updatedBy, updatedAt } = user
  const classes = useStyles()

  return (
    <Paper className={classes.root} elevation={1}>
      <Typography className={classes.breadcrum} variant="h6" id="tableTitle">
        <span className={classes.breadcrum}>
          {breadcrumb
            && <>
              {breadcrumb} <ArrowForwardIcon className={classes.breadcrumIcon} />
            </>}
          {`${firstName} ${lastName}`}
        </span>
      </Typography>
      <div className={classes.stampsContainer}>
        <div className={classes.stampsRow}>
          <Stamp
            label="Adicionado por"
            value={createdBy ? createdBy.firstName : "Importado"}
          />
          <Stamp
            label="em"
            value={formatDate(createdAt)}
          />
        </div>
        <div className={`${classes.stampsRow} ${classes.stampsLast}`}>
          <Stamp
            label="Actualizado por"
            value={updatedBy ? updatedBy.firstName : "Importado"}
          />
          <Stamp
            label="em"
            value={formatDate(updatedAt)}
          />
        </div>
      </div>
    </Paper>
  )
}
