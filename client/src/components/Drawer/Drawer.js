import React, { useState } from "react"
import { Link, withRouter } from "react-router-dom"
import { Drawer as DrawerMat, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { Home, People, Person, ExitToApp, ArrowBack, ArrowForward } from "@material-ui/icons"

const drawerWidth = 240
const useStyles = makeStyles((theme) => ({
  logo: {
    display: "flex",
    justifyContent: "center",
    padding: "25px 0",
    "& > *": {
      width: "220px"
    }
  },
  logoShrink: {
    paddingLeft: "115px"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1
    }
  },
  link: {
    textDecoration: "none"
  },
  listItem: {
    padding: "18px",
    whiteSpace: "nowrap"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(2.5),
    width: "100%",
    paddingLeft: theme.spacing(28) + theme.spacing(5),
    transition: theme.transitions.create("padding-left", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  contentShrink: {
    paddingLeft: theme.spacing(7) + theme.spacing(5),
    transition: theme.transitions.create("padding-left", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  arrow: {
    height: "100%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    padding: "25px",
    color: theme.palette.primary.main,
    "& > *": {
      cursor: "pointer"
    }
  }
}))

const menus = [
  { label: "Início", icon: <Home />, link: "/" },
  { label: "Sócios", icon: <People />, link: "/partners" },
  { label: "A minha conta", icon: <Person />, link: "/profile" },
  { label: "Sair", icon: <ExitToApp />, link: "/logout" }
]

export const _Drawer = ({ children, location: { pathname } }) => {
  const [open, setOpen] = useState(true)
  const classes = useStyles()

  return (
    <>
      <DrawerMat
        classes={{ paper: `${classes.drawerOpen} ${!open && classes.drawerClose}` }}
        variant="permanent"
        open={open}
      >
        <div className={`${classes.logo} ${!open && classes.logoShrink}`}>
          <img src="/assets/logo.png" alt="" />
        </div>
        <List>
          {menus.map(({ link, label, icon }) => (
            <Link className={classes.link} to={link} key={label}>
              <ListItem classes={{ root: classes.listItem }} alignItems="center" selected={link === pathname} button>
                <ListItemIcon>
                  {icon}
                </ListItemIcon>
                <ListItemText primary={open && label} />
              </ListItem>
            </Link>
          ))}
        </List>
        <div className={classes.arrow}>
          {open
            ? <ArrowBack fontSize="large" onClick={() => setOpen(false)} />
            : <ArrowForward fontSize="large" onClick={() => setOpen(true)} />}
        </div>
      </DrawerMat>
      <main className={`${classes.content} ${!open && classes.contentShrink}`}>
        {children}
      </main>
    </>
  )
}

export const Drawer = withRouter(_Drawer)
