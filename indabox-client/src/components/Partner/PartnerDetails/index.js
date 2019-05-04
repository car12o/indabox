import React, { Component } from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Input from '../../Input';
import CheckBox from '../../CheckBox';
import DropDown from '../../DropDown';
import TextArea from '../../TextArea';
import './styles.css'


const styles = (theme) => ({
	root: {
		display: 'flex',
	},
	titleContainer: {
		display: 'flex',
		flexDirection: 'column',
		borderTop: `1px solid ${theme.palette.secondary.light}`,
		width: '37%',
		padding: '0 30px',
	},
	titleContainerCenter: {
		borderLeft: `1px solid ${theme.palette.secondary.light}`,
		borderRight: `1px solid ${theme.palette.secondary.light}`,
	},
	titleContainerLast: {
		width: '26%',
	},
	title: {
		padding: '18px 30px',
		fontSize: '14px',
		marginBottom: '10px',
		color: 'white',
	},
	container: {
		display: 'flex',
		flexDirection: 'row',
	},
	containerTitle: {
		flex: 1,
		marginRight: '25px',
	},
	containerFirstName: {
		flex: 3,
	},
	checkBoxContainer: {
		marginBottom: '10px',
	},
	partnerContainer: {
		marginBottom: '20px',
	},
	label: {
		color: theme.palette.primary.main,
		fontSize: '12px',
	},
	value: {
		marginTop: '10px',
		fontSize: '16px',
	},
	bottomLabelsFirst: {
		marginRight: '40px',
		flexGrow: 1,
	},
	bottomLabelsSecond: {
		flexGrow: 2,
	},
	actionsContainer: {
		backgroundColor: theme.palette.background.default,
		display: 'flex',
		justifyContent: 'center',
	},
	actionButton: {
		margin: '20px',
	}
});

class PartnerDetails extends Component {
	render() {
		const { classes, partner, disabled, actions, buttons } = this.props;

		return (
			<div>
				<div id="partner-details" className={classes.root}>
					<div className={classes.titleContainer}>
						<span className={classes.title}>INDENTIFICAÇÃO</span>
						<div className={classes.container}>
							<div className={classes.containerTitle}>
							<DropDown
									label="Titulo"
									disabled={disabled}
									options={[
										{
											value: 'Dr',
											label: 'Dr',
										},
										{
											value: 'Dra',
											label: 'Dra',
										},
										{
											value: 'Prof',
											label: 'Prof',
										},
									]}
								/>
							</div>
							<div className={classes.containerFirstName}>
								<Input
									type="text"
									label={partner.firstName.label}
									disabled={disabled}
									value={partner.firstName.value}
									onChange={actions.setFirstName}
									error={partner.firstName.error}
								/>
							</div>
						</div>
						<Input
							type="text"
							label={partner.lastName.label}
							disabled={disabled}
							value={partner.lastName.value}
							onChange={actions.setLastName}
							error={partner.lastName.error}
						/>
						<Input
							type="text"
							label={partner.nif.label}
							disabled={disabled}
							value={partner.nif.value}
							onChange={actions.setNif}
							error={partner.nif.error}
						/>
						<Input
							type="text"
							label={partner.email.label}
							disabled={disabled}
							value={partner.email.value}
							onChange={actions.setEmail}
							error={partner.email.error}
						/>
						<div className={classNames(classes.container, classes.checkBoxContainer)}>
							<CheckBox
								label={partner.alerts.label}
								value={partner.alerts.value}
								onChange={actions.setAlerts}
								disabled={disabled}
							/>
							<CheckBox
								label={partner.newsletter.label}
								value={partner.newsletter.value}
								onChange={actions.setNewsletter}
								disabled={disabled}
							/>
						</div>
						<Input
							type={partner.phone.label}
							label="Telefone"
							disabled={disabled}
							value={partner.phone.value}
							onChange={actions.setPhone}
							error={partner.phone.error}
						/>
						<div className={classNames(classes.container, classes.partnerContainer)}>
							<div className={classes.bottomLabelsFirst}>
								<span className={classes.label}>Nº de sócio</span>
								<p className={classes.value}>{partner.number}</p>
							</div>
							<div className={classes.bottomLabelsSecond}>
								<DropDown
									label={partner.type.label}
									value={partner.type.value}
									disabled={disabled}
									onChange={actions.setType}
									options={[
										{
											value: 'Titular',
											label: 'Titular',
										},
										{
											value: 'Aderente',
											label: 'Aderente',
										},
										{
											value: 'Efectivo',
											label: 'Efectivo',
										},
									]}
								/>
							</div>
						</div>
					</div>
					<div className={classNames(classes.titleContainer, classes.titleContainerCenter)}>
						<span className={classes.title}>DADOS DE FATURAÇÃO</span>
						<Input
							type="text"
							label={partner.address.label}
							disabled={disabled}
							value={partner.address.value}
							onChange={actions.setAddress}
							error={partner.address.error}
						/>
						<Input
							type="text"
							label={partner.postCode.label}
							disabled={disabled}
							value={partner.postCode.value}
							onChange={actions.setPostCode}
							error={partner.postCode.error}
						/>
						<Input
							type="text"
							label={partner.city.label}
							disabled={disabled}
							value={partner.city.value}
							onChange={actions.setCity}
							error={partner.city.error}
						/>
						<DropDown
							label={partner.country.label}
							value={partner.country.value}
							disabled={disabled}
							onChange={actions.setCountry}
							options={[
								{
									value: 'Portugal',
									label: 'Portugal',
								},
								{
									value: 'Espanha',
									label: 'Espanha',
								},
								{
									value: 'Franca',
									label: 'Franca',
								},
							]}
						/>
					</div>
					<div className={classNames(classes.titleContainer, classes.titleContainerLast)}>
						<span className={classes.title}>ADMINISTRAÇÃO</span>
						<TextArea
							label={partner.notes.label}
							disabled={disabled}
							value={partner.notes.value}
							error={partner.notes.error}
							onChange={actions.setNotes}
						/>
					</div>
				</div>
				<div className={classes.actionsContainer}>
					<Button classes={{ contained: classes.actionButton }} color="secondary" size="large" variant="contained"
						onClick={() => buttons.leftButton.fn(!disabled)}>
						{buttons.leftButton.label}
					</Button>
					<Button classes={{ contained: classes.actionButton }} color="primary" size="large" variant="contained"
						onClick={() => buttons.rightButton.fn(!disabled)}>
						{buttons.rightButton.label}
					</Button>
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(PartnerDetails);
