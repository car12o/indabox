import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Input from '../../Input';
import CheckBox from '../../CheckBox';
import DropDown from '../../DropDown/dropDown';
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
		const { classes, partner, setProperty } = this.props;

		return (
			<div id="partner-details" className={classes.root}>
				<Typography classes={{ root: classes.title }}>DADOS PESSOAIS</Typography>
				<div className={classes.row}>
					<DropDown
						label={partner.title.label}
						value={partner.title.value}
						onChange={value => setProperty('title', value)}
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
						// disabled={disabled}
						styles={classes.dropdown}
					/>
					<Input
						type="text"
						label={partner.firstName.label}
						value={partner.firstName.value}
						onChange={value => setProperty('firstName', value)}
						error={partner.firstName.error}
						// disabled={disabled}
						styles={classes.input}
					/>
					<Input
						type="text"
						label={partner.lastName.label}
						value={partner.lastName.value}
						onChange={value => setProperty('lastName', value)}
						error={partner.lastName.error}
						// disabled={disabled}
						styles={classes.input}
					/>
				</div>
				<div className={classes.row}>
					<DropDown
						label={partner.role.label}
						value={partner.role.value.label}
						onChange={value => setProperty('role.value.label', value)}
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
						// disabled={disabled}
						styles={classes.dropdown}
					/>
					<Input
						type="text"
						label={partner.number.label}
						value={partner.number.value}
						onChange={value => setProperty('number', value)}
						error={partner.number.error}
						// disabled={disabled}
						styles={classes.input}
					/>
					<Input
						type="text"
						label={partner.nif.label}
						value={partner.nif.value}
						onChange={value => setProperty('nif', value)}
						error={partner.nif.error}
						// disabled={disabled}
						styles={classes.input}
					/>
				</div>
				<div className={classes.row}>
					<Input
						type="text"
						label={partner.email.label}
						value={partner.email.value}
						onChange={value => setProperty('email', value)}
						error={partner.email.error}
						// disabled={disabled}
						styles={classes.input}
					/>
					<Input
						type="password"
						label={partner.password.label}
						value={partner.password.value}
						onChange={value => setProperty('password', value)}
						error={partner.password.error}
						// disabled={disabled}
						styles={classes.input}
					/>
					<Input
						type="password"
						label={partner.rePassword.label}
						value={partner.rePassword.value}
						onChange={value => setProperty('rePassword', value)}
						error={partner.rePassword.error}
						// disabled={disabled}
						styles={classes.input}
					/>
				</div>
				<div className={classes.row}>
					<Input
						type="text"
						label={partner.ballotNumber.label}
						value={partner.ballotNumber.value}
						onChange={value => setProperty('ballotNumber', value)}
						error={partner.ballotNumber.error}
						// disabled={disabled}
						styles={classes.input}
					/>
					<Input
						type="text"
						label={partner.specialty.label}
						value={partner.specialty.value}
						onChange={value => setProperty('specialty', value)}
						error={partner.specialty.error}
						// disabled={disabled}
						styles={classes.input}
					/>
					<Input
						type="text"
						label={partner.specialtySessions.label}
						value={partner.specialtySessions.value}
						onChange={value => setProperty('specialtySessions', value)}
						error={partner.specialtySessions.error}
						// disabled={disabled}
						styles={classes.input}
					/>
				</div>
				<div className={classes.row}>
					<CheckBox
						label={partner.alerts.label}
						value={partner.alerts.value}
						onChange={value => setProperty('alerts', value)}
						// disabled={disabled}
						styles={classes.input}
					/>
					<CheckBox
						label={partner.newsletter.label}
						value={partner.newsletter.value}
						onChange={value => setProperty('newsletter', value)}
						// disabled={disabled}
						styles={classes.input}
					/>
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(PartnerDetails);
