import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Stamps from '../../components/Stamps';
import PartnerDetails from '../../components/PartnerDetails';

function TabContainer({ children, dir }) {
	return (
		<Typography component="div" dir={dir}>
			{children}
		</Typography>
	);
}

const styles = theme => ({
	root: {
		...theme.mixins.gutters(),
		paddingTop: theme.spacing.unit * 2,
		paddingBottom: theme.spacing.unit * 2,
	},
	breadcrum: {
		display: 'flex',
	},
	breadcrumIcon: {
		alignSelf: 'center',
		margin: '0 6px',
		fill: theme.palette.secondary.light,
	},
	stampsContainer: {
		display: 'flex',
		marginTop: '25px',
	},
	stampsLast: {
		marginLeft: '150px',
	},
	tabsContainer: {
		backgroundColor: theme.palette.background.paper,
		width: '100%',
		marginTop: '25px',
	},
	tabsAppBar: {
		backgroundColor: theme.palette.background.paper,
		boxShadow: 'none',
	},
	tab: {
		color: theme.palette.secondary.main,
	}
});

class Partner extends Component {
	state = {
		value: 1,
	};

	handleChange = (event, value) => {
		this.setState({ value });
	};

	handleChangeIndex = index => {
		this.setState({ value: index });
	};

	render() {
		const { classes } = this.props;

		const theme = {
			direction: 'ltl',
		};

		return (
			<div>
				<Paper className={classes.root} elevation={1}>
					<Typography className={classes.breadcrum} variant="h6" id="tableTitle">
						Sócios <ArrowForwardIcon className={classes.breadcrumIcon} /> Joao
              		</Typography>
					<div className={classes.stampsContainer}>
						<Stamps addedBy={'Diogo Melo'} addedWhen={'2016-01-20 12:23:42'} />
						<Stamps classes={{ root: classes.stampsLast }} addedBy={'Diogo Melo'} addedWhen={'2016-01-20 12:23:42'} />
					</div>
				</Paper>

				<div className={classes.tabsContainer}>
					<AppBar className={classes.tabsAppBar} position="static" color="default">
						<Tabs
							value={this.state.value}
							onChange={this.handleChange}
							indicatorColor="primary"
							textColor="primary"
						>
							<Tab classes={{ root: classes.tab }} label="Quotas" />
							<Tab classes={{ root: classes.tab }} label="Dados pessoais" />
						</Tabs>
					</AppBar>
					<SwipeableViews
						axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
						index={this.state.value}
						onChangeIndex={this.handleChangeIndex}
					>
						<TabContainer dir={theme.direction}>
							Item One
						</TabContainer>
						<TabContainer dir={theme.direction}>
							<PartnerDetails />
						</TabContainer>
					</SwipeableViews>
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(Partner);
