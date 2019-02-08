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

// Routes ...
import Partners from '../Partners';
import Test from '../Test';

const drawerWidth = 240
const styles = theme => ({
	root: {
		display: 'flex',
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
	},
	drawerHeader: {
		display: 'flex',
		justifyContent: 'center',
		padding: '30px 0',
	},
	drawerShow: {
		display: 'none',
	},
	drawerhide: {
		display: 'flex',
		alignSelf: 'flex-end',
		flexGrow: 2,
	},
	drawerhideIconBack: {
		alignSelf: 'flex-end',
		margin: '20px',
		color: theme.palette.primary.main,
	},
	drawerhideIconForward: {
		alignSelf: 'flex-end',
		color: theme.palette.primary.main,
	},
	listItem: {
		padding: '18px 30px',
	},
	selected: {
		color: theme.palette.primary.main,
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing.unit * 3,
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		marginLeft: -drawerWidth,
	},
	contentShift: {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginLeft: 0,
	},
	link: {
		textDecoration: 'none',
	},
})

class Home extends Component {
	state = {
		open: true,
		menus: [
			{
				label: 'Sócios',
				icon: <PeopleIcon />,
				selected: true,
				link: '/'
			},
			{
				label: 'A minha conta',
				icon: <PersonIcon />,
				selected: false,
				link: '/profile'
			},
			{
				label: 'Sair',
				icon: <ExitToAppIcon />,
				selected: false,
				link: '/logout'
			}
		]
	};

	handleMenuClick = (label) => {
		const menus = this.state.menus.map(menu => menu.label === label
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
		const { classes } = this.props;
		const { open, menus } = this.state;

		return (
			<div className={classes.root}>
				<Drawer
					className={classes.drawer}
					variant="persistent"
					anchor="left"
					open={open}
					classes={{
						paper: classes.drawerPaper,
					}}
				>
					<div className={classes.drawerHeader}>
						<img src="/assets/logo.png" alt="" />
					</div>
					<List>
						{menus.map(menu => (
							<Link className={classes.link} to={menu.link} key={menu.label}>
								<ListItem className={classes.listItem} button
									onClick={() => this.handleMenuClick(menu.label)}
								>
									<ListItemIcon className={menu.selected ? classes.selected : ''} >
										{menu.icon}
									</ListItemIcon>
									<ListItemText classes={{ primary: menu.selected ? classes.selected : '' }} primary={menu.label} />
								</ListItem>
							</Link>
						))}
					</List>
					<div className={classes.drawerhide}>
						<ArrowBackIcon className={classes.drawerhideIconBack} fontSize="large" onClick={() => this.handleDrawerClose()} />
					</div>
				</Drawer>
				<main className={classNames(classes.content, {
					[classes.contentShift]: open,
				})}>
					<div className={classNames({[classes.drawerShow]: open })}>
						<ArrowForward className={classes.drawerhideIconForward} fontSize="large" onClick={() => this.handleDrawerOpen()} />
					</div>
					<Route path="//" component={Partners} />
					<Route path="/profile" component={Test} />
				</main>
			</div>
		);
	}
}

export default connect()(withStyles(styles)(Home));
