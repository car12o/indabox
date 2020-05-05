import React, { useState, useMemo } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Paper, Tabs, Tab } from "@material-ui/core"
import { Quotas } from "./Quotas/Quotas"
import { Payments } from "./Payments/Payments"
import { Identification } from "./Identification/Identification"
import { Contact } from "./Contact/Contact"
import { Notes } from "./Notes/Notes"
import { paymentStatus, userRoles } from "../../constants"

const useStyles = makeStyles((theme) => ({
  tab: {
    color: theme.palette.secondary.main
  },
  tabSelected: {
    fontWeight: "bold"
  }
}))

export const UserBody = ({ user, updateUser, updatePaymentAndQuotas, metadata, loggedUser }) => {
  const [tabIndex, setTabIndex] = useState(0)
  const classes = useStyles()
  const inactive = useMemo(
    () => loggedUser.role > userRoles.admin || user.deletedAt,
    [loggedUser.role, user.deletedAt]
  )

  return (
    <Paper elevation={1}>
      <Tabs
        value={tabIndex}
        onChange={(_, index) => setTabIndex(index)}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
      >
        <Tab
          classes={{ textColorPrimary: classes.tab, selected: classes.tabSelected }}
          label="Quotas"
        />
        <Tab
          classes={{ textColorPrimary: classes.tab, selected: classes.tabSelected }}
          label="Pagamentos"
        />
        <Tab
          classes={{ textColorPrimary: classes.tab, selected: classes.tabSelected }}
          label="Identificação"
        />
        <Tab
          classes={{ textColorPrimary: classes.tab, selected: classes.tabSelected }}
          label="Contactos"
        />
        <Tab
          classes={{ textColorPrimary: classes.tab, selected: classes.tabSelected }}
          label="Notas"
        />
      </Tabs>
      {tabIndex === 0 && (
        <Quotas
          quotas={user.quotas}
          paymentStatus={paymentStatus}
          updatePaymentAndQuotas={updatePaymentAndQuotas}
          setTabIndex={setTabIndex}
          inactive={inactive}
          blur={user.deletedAt}
        />
      )}
      {tabIndex === 1 && (
        <Payments
          payments={user.payments}
          paymentStatus={paymentStatus}
          updatePaymentAndQuotas={updatePaymentAndQuotas}
          inactive={inactive}
          blur={user.deletedAt}
        />
      )}
      {tabIndex === 2 && (
        <Identification
          user={user}
          updateUser={updateUser}
          titles={metadata.titles || []}
          roles={metadata.roles || []}
          inactive={inactive}
          blur={user.deletedAt}
        />
      )}
      {tabIndex === 3 && (
        <Contact
          user={user}
          updateUser={updateUser}
          countries={metadata.countries || []}
          inactive={inactive}
          blur={user.deletedAt}
        />
      )}
      {tabIndex === 4 && (
        <Notes
          notes={user.notes}
          userId={user._id}
          updateUser={updateUser}
          inactive={inactive}
          blur={user.deletedAt}
        />
      )}
    </Paper >
  )
}
