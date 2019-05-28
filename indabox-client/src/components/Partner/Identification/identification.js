import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Input from '../../Input';
import CheckBox from '../../CheckBox';
import DropDown from '../../DropDown';
import './styles.css'


const styles = (theme) => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
	},
	title: {
		padding: '18px 30px',
		fontSize: '14px',
		marginBottom: '10px',
		color: 'white',
	},
	row: {
		display: 'flex',
		padding: '0 20px',
		margin: '15px 0'
	},
	input: {
		padding: '0 20px',
	},
	dropdown: {
		padding: '0 20px',
	}
});

class PartnerDetails extends Component {
	render() {
		const { classes, partner, disabled, actions } = this.props;

		return (
			<div id="partner-details" className={classes.root}>
				<Typography classes={{ root: classes.title }}>DADOS PESSOAIS</Typography>
				<div className={classes.row}>
					<DropDown
						label="Titulo"
						disabled={disabled}
						styles={classes.dropdown}
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
					<Input
						type="text"
						label={partner.firstName.label}
						disabled={disabled}
						value={partner.firstName.value}
						onChange={actions.setFirstName}
						error={partner.firstName.error}
						styles={classes.input}
					/>
					<Input
						type="text"
						label={partner.lastName.label}
						disabled={disabled}
						value={partner.lastName.value}
						onChange={actions.setLastName}
						error={partner.lastName.error}
						styles={classes.input}
					/>
				</div>
				<div className={classes.row}>
					<DropDown
						label="Titulo"
						disabled={disabled}
						styles={classes.dropdown}
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
					<Input
						type="text"
						label={partner.firstName.label}
						disabled={disabled}
						value={partner.firstName.value}
						onChange={actions.setFirstName}
						error={partner.firstName.error}
						styles={classes.input}
					/>
					<Input
						type="text"
						label={partner.lastName.label}
						disabled={disabled}
						value={partner.lastName.value}
						onChange={actions.setLastName}
						error={partner.lastName.error}
						styles={classes.input}
					/>
				</div>
				<div className={classes.row}>
					<DropDown
						label="Titulo"
						disabled={disabled}
						styles={classes.dropdown}
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
					<Input
						type="text"
						label={partner.firstName.label}
						disabled={disabled}
						value={partner.firstName.value}
						onChange={actions.setFirstName}
						error={partner.firstName.error}
						styles={classes.input}
					/>
					<Input
						type="text"
						label={partner.lastName.label}
						disabled={disabled}
						value={partner.lastName.value}
						onChange={actions.setLastName}
						error={partner.lastName.error}
						styles={classes.input}
					/>
				</div>
				<div className={classes.row}>
					<DropDown
						label="Titulo"
						disabled={disabled}
						styles={classes.dropdown}
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
					<Input
						type="text"
						label={partner.firstName.label}
						disabled={disabled}
						value={partner.firstName.value}
						onChange={actions.setFirstName}
						error={partner.firstName.error}
						styles={classes.input}
					/>
					<Input
						type="text"
						label={partner.lastName.label}
						disabled={disabled}
						value={partner.lastName.value}
						onChange={actions.setLastName}
						error={partner.lastName.error}
						styles={classes.input}
					/>
				</div>
				<div className={classes.row}>
					<CheckBox
						label={partner.alerts.label}
						value={partner.alerts.value}
						onChange={actions.setAlerts}
						disabled={disabled}
						styles={classes.input}
					/>
					<CheckBox
						label={partner.newsletter.label}
						value={partner.newsletter.value}
						onChange={actions.setNewsletter}
						disabled={disabled}
						styles={classes.input}
					/>
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(PartnerDetails);
