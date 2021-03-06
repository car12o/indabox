import React, { useState, useMemo } from "react"
import { makeStyles, Paper, Typography } from "@material-ui/core"
import ArrowForwardIcon from "@material-ui/icons/ArrowForward"
import { userRoles } from "../../constants"
import { formatDate } from "../../services/transform"
import { useApi } from "../../services/Api"
import { Stamp } from "../Stamp/Stamp"
import { MenuOptions } from "../MenuOptions/MenuOptions"
import { HeaderModal } from "./HeaderModal"

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
  deactivate: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end"
  }
}))

export const UserHeader = ({ user, breadcrumb, updateUser, loggedUser }) => {
  const { firstName, lastName, createdBy, createdAt, updatedBy, updatedAt, deletedAt, deletedBy } = user
  const [open, setOpen] = useState(false)
  const classes = useStyles()
  const api = useApi()
  const disableByRole = useMemo(() => loggedUser.role > userRoles.admin, [loggedUser])
  const options = [{
    label: "Inativar utilizador",
    onClick: () => setOpen(true)
  }]

  const deletedUser = async () => {
    const { body } = await api.del(`/users/${user._id}`)
    updateUser(body)
    setOpen(false)
  }

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
        {!(disableByRole || user.deletedAt) && <MenuOptions options={options} />}
      </div>
      <HeaderModal
        open={open}
        setOpen={setOpen}
        deletedUser={deletedUser}
      />
    </Paper>
  )
}
