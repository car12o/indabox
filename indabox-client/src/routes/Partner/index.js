import React, { Component } from 'react';
import { connect } from 'react-redux';
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
import { partnersAc } from '../../store/actions';

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

	componentDidMount() {
		const { partners, match, history, setPartner } = this.props;
		if (partners.selected.isEmpty) {
			setPartner(parseInt(match.params.id, 10), history);
		}
	}

	handleChange = (event, value) => {
		this.setState({ value });
	};

	handleChangeIndex = index => {
		this.setState({ value: index });
	};

	render() {
		const { classes, partners } = this.props;
		const partner = partners.selected.value;

		const theme = {
			direction: 'ltl',
		};

		return (
			<div>
				<Paper className={classes.root} elevation={1}>
					<Typography className={classes.breadcrum} variant="h6" id="tableTitle">
						Sócios <ArrowForwardIcon className={classes.breadcrumIcon} />
						{`${partner.firstName.value} ${partner.lastName.value}`}
					</Typography>
					<div className={classes.stampsContainer}>
						<Stamps
							firstLabel="Adicionado por"
							firstValue={partner.createdBy}
							secoundLabel="em"
							secoundValue={partner.createdAt}
						/>
						<Stamps
							classes={{ root: classes.stampsLast }}
							firstLabel="Actualizado por"
							firstValue={partner.updatedBy}
							secoundLabel="em"
							secoundValue={partner.updatedAt}
						/>
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
							<PartnerDetails partner={partner} />
						</TabContainer>
					</SwipeableViews>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	partners: state.partners
});

const mapDispatchToProps = dispatch => ({
	setPartner: (partner, history) => dispatch(partnersAc.setSelected(partner, history)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Partner));
