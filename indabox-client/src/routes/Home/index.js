import React, { Component } from 'react';
import { Route, Link } from "react-router-dom";
import { connect } from 'react-redux';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import PeopleIcon from '@material-ui/icons/People';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForward from '@material-ui/icons/ArrowForward';
import HomeIcon from '@material-ui/icons/Home';

// Routes ...
import Partners from '../Partners';
import Partner from '../Partner';
import Profile from '../Profile';

const drawerWidth = 240;
const styles = theme => ({
	root: {
		display: 'flex',
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: 'nowrap',
	},
	drawerOpen: {
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerClose: {
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		overflowX: 'hidden',
		width: theme.spacing.unit * 7 + 1,
		[theme.breakpoints.up('sm')]: {
			width: theme.spacing.unit * 9 + 1,
		},
	},
	drawerHeader: {
		display: 'flex',
		justifyContent: 'center',
		padding: '30px 0',
		transition: "padding 0.2s ease",
	},
	drawerHeaderClose: {
		padding: "30px 6px",
		justifyContent: 'normal',
	},
	drawerIconContainer: {
		display: 'flex',
		alignSelf: 'flex-end',
		flexGrow: 2,
	},
	drawerIcon: {
		alignSelf: 'flex-end',
		margin: '20px',
		color: theme.palette.primary.main,
		cursor: 'pointer',
	},
	listItem: {
		padding: '18px 30px',
		transition: "padding 0.2s ease",
	},
	listItemClosed: {
		padding: '18px 24px',
	},
	selected: {
		color: theme.palette.primary.main,
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing.unit * 3,
	},
	link: {
		textDecoration: 'none',
	},
});

class Home extends Component {
	state = {
		open: true,
		menus: [
			{
				label: 'Início',
				icon: <HomeIcon />,
				link: '/'
			},
			{
				label: 'Sócios',
				icon: <PeopleIcon />,
				link: '/partners'
			},
			{
				label: 'A minha conta',
				icon: <PersonIcon />,
				link: '/profile'
			},
			{
				label: 'Sair',
				icon: <ExitToAppIcon />,
				link: '/logout'
			}
		]
	};

	handleMenuClick = (link) => {
		const menus = this.state.menus.map(menu => menu.link === link
			? Object.assign({}, menu, { selected: true })
			: Object.assign({}, menu, { selected: false })
		);
		this.setState(Object.assign({}, this.state, { menus }));
	}

	handleDrawerOpen = () => {
		this.setState({ open: true });
	};

	handleDrawerClose = () => {
		this.setState({ open: false });
	};

	render() {
		const { classes, location } = this.props;
		const { open, menus } = this.state;

		return (
			<div className={classes.root}>
				<Drawer
					variant="permanent"
					className={classNames(classes.drawer, {
						[classes.drawerOpen]: open,
						[classes.drawerClose]: !open,
					})}
					classes={{
						paper: classNames({
							[classes.drawerOpen]: open,
							[classes.drawerClose]: !open,
						}),
					}}
					open={open}
				>
					<div className={classNames(classes.drawerHeader, {
						[classes.drawerHeaderClose]: !open
					})}>
						<img src="/assets/logo.png" alt="" />
					</div>
					<List>
						{menus.map(menu => (
							<Link className={classes.link} to={menu.link} key={menu.label}>
								<ListItem className={classNames(classes.listItem, {
									[classes.listItemClosed]: !open
								})} button
									onClick={() => this.handleMenuClick(menu.link)}
								>
									<ListItemIcon
										className={location.pathname === menu.link ? classes.selected : ''} >
										{menu.icon}
									</ListItemIcon>
									<ListItemText
										classes={{ primary: location.pathname === menu.link ? classes.selected : '' }}
										primary={menu.label}
									/>
								</ListItem>
							</Link>
						))}
					</List>
					<div className={classes.drawerIconContainer}>
						{open
							? <ArrowBackIcon className={classes.drawerIcon} fontSize="large" onClick={() => this.handleDrawerClose()} />
							: <ArrowForward className={classes.drawerIcon} fontSize="large" onClick={() => this.handleDrawerOpen()} />
						}
					</div>
				</Drawer>
				<main className={classNames(classes.content, {
					[classes.contentShift]: open,
				})}>
					<Route path="/partners" exact component={Partners} />
					<Route path="/partners/:id" component={Partner} />
					<Route path="/profile" component={Profile} />
				</main>
			</div>
		);
	}
}

export default connect()(withStyles(styles)(Home));
