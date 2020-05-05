import React from "react"
import { makeStyles, Paper, Typography } from "@material-ui/core"
import ArrowForwardIcon from "@material-ui/icons/ArrowForward"
import { formatDate } from "../../services/transform"
import { Stamp } from "../Stamp/Stamp"
import { MenuOptions } from "../MenuOptions/MenuOptions"
import { useApi } from "../../services/api"
import { userRoles } from "../../constants"

const useStyles = makeStyles((theme) => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    marginBottom: theme.spacing(3),
    display: "flex"
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
    width: "300px",
    marginRight: "25px"
  },
  stampsLast: {
    marginLeft: "100px"
  },
  deactivate: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end"
  },
  button: {
    height: "35px"
  }
}))

export const UserHeader = ({ user, breadcrumb, updateUser, loggedUser }) => {
  const { firstName, lastName, createdBy, createdAt, updatedBy, updatedAt, deletedAt, deletedBy } = user
  const classes = useStyles()
  const api = useApi()
  const options = [{
    label: "Inativar utilizador",
    onClick: async () => {
      const { body } = await api.del(`/users/${user._id}`)
      updateUser(body)
    }
  }]

  return (
    <Paper className={classes.root} elevation={1}>
      <div>
        <Typography className={classes.breadcrum} variant="h6">
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
          <div className={classes.stampsRow}>
            <Stamp
              label="Actualizado por"
              value={updatedBy ? updatedBy.firstName : "Importado"}
            />
            <Stamp
              label="em"
              value={formatDate(updatedAt)}
            />
          </div>
          {deletedAt && (
            <div className={classes.stampsRow}>
              <Stamp
                label="Eliminado por"
                value={deletedBy ? deletedBy.firstName : "Importado"}
              />
              <Stamp
                label="em"
                value={formatDate(deletedAt)}
              />
            </div>
          )}

        </div>
      </div>
      <div className={classes.deactivate}>
        {loggedUser.role <= userRoles.admin && !user.deletedAt && <MenuOptions options={options} />}
      </div>
    </Paper>
  )
}
