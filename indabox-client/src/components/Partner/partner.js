import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Stamps from '../Stamps';
import Identification from './Identification/identification';
import Contact from './Contact/contact';
import Notes from './Notes/notes';
import Payments from './Payments/payments';
import TableSelect from '../TableSelect';
import TabContainer from './TabContainer/tabContainer';

function PaperHeader({ profile, partner, classes }) {
	if (profile) {
		return (
			<span className={classes.breadcrum}>
				{`${partner.firstName.value} ${partner.lastName.value}`}
			</span>
		);
	}
	return (
		<span className={classes.breadcrum}>
			Sócios <ArrowForwardIcon className={classes.breadcrumIcon} />
			{`${partner.firstName.value} ${partner.lastName.value}`}
		</span>
	);
}

const quotasRows = [
	{ id: 'year', numeric: false, disablePadding: false, label: 'ANO' },
	{ id: 'payment.status.label', numeric: false, disablePadding: false, label: 'ESTADO', default: 'Por pagar', color: true },
	{ id: 'value', numeric: false, disablePadding: false, label: 'VALOR', symbol: '€' },
	{ id: 'payment.updatedAt', numeric: false, disablePadding: false, label: 'DATA DE PAGAMENTO' },
];

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
		boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
	},
	tabsAppBar: {
		backgroundColor: theme.palette.background.paper,
		boxShadow: 'none',
	},
	tab: {
		color: theme.palette.secondary.main,
	},
	tabSelected: {
		fontWeight: 'bold',
	},
	classLabel: {
		marginRight: '15px',
	},
});

class Partner extends Component {
	state = {
		quotes: {
			selected: [],
		}
	};

	render() {
		const { classes, partner, profile, tab, handleChange, setProperty } = this.props;

		const theme = {
			direction: 'ltl',
		};

		return (
			<div className={classes.container}>
				<Paper className={classes.root} elevation={1}>
					<Typography className={classes.breadcrum} variant="h6" id="tableTitle">
						<PaperHeader classes={classes} partner={partner} profile={profile} />
					</Typography>
					<div className={classes.stampsContainer}>
						<Stamps
							firstLabel="Adicionado por"
							firstValue={partner.createdBy}
							secoundLabel="em"
							secoundValue={partner.createdAt}
							classLabel={classes.classLabel}
						/>
						<Stamps
							classes={{ root: classes.stampsLast }}
							firstLabel="Actualizado por"
							firstValue={partner.updatedBy}
							secoundLabel="em"
							secoundValue={partner.updatedAt}
							classLabel={classes.classLabel}
						/>
					</div>
				</Paper>

				<div className={classes.tabsContainer}>
					<AppBar className={classes.tabsAppBar} position="static" color="default">
						<Tabs
							value={tab}
							onChange={handleChange}
							indicatorColor="primary"
							textColor="primary"
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
					</AppBar>
					<SwipeableViews
						axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
						index={tab}
					>
						<TabContainer>
							{/* <TabContainer
							selected={this.state.quotes.selected}
							buttons={quotas.buttons}
							disabled={!this.state.quotes.selected.length}
						> */}
							<TableSelect
								rows={quotasRows}
								data={partner.quotas}
								onClick={() => { }}
								onSelect={(selected) => this.setState({ quotes: { selected } })}
								order="desc"
								orderBy="year"
							/>
						</TabContainer>
						<TabContainer>
							<Payments data={partner.quotas.reduce((accm, quota) => {
								if (quota.payment) {
									accm.push(quota.payment);
								}
								return accm;
							}, []).sort((a, b) => a.createdAt - b.createdAt)} />
						</TabContainer>
						<TabContainer>
							{/* <TabContainer buttons={partnerDetails.buttons}> */}
							<Identification
								partner={partner}
								setProperty={setProperty}
							// actions={partnerActions}
							// disabled={partnerDetails.disabled}
							/>
						</TabContainer>
						<TabContainer>
							{/* <TabContainer buttons={partnerDetails.buttons}> */}
							<Contact
								partner={partner}
								setProperty={setProperty}
							/>
						</TabContainer>
						<TabContainer>
							<Notes
								partner={partner}
								setProperty={setProperty}
							/>
						</TabContainer>
					</SwipeableViews>
				</div>
			</div >
		);
	}
}

export default withStyles(styles)(Partner);
