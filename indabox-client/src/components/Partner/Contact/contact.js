import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import RadioGroup from '../../RadioGroup/radioGroup';
import Radio from '@material-ui/core/Radio';
import Input from '../../Input';
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
		marginBottom: '15px',
		color: 'white',
	},
	formControlLabel: {
		width: '49%',
		paddingLeft: '56px'
	},
	container: {
		display: 'flex',
	},
	column: {
		width: '100%',
		padding: '10px 50px',
	},
	row: {
		display: 'flex',
		flexDirection: 'row',
	},
	dropdown: {
		margin: '0 0 20px 0',
	},
	rowInput: {
		marginRight: '20px',
	}
});

class PartnerDetails extends Component {
	state = {
		radioGroupValue: '0',
	};

	radioHandleChange = event => {
		this.setState({ radioGroupValue: event.target.value });
	};

	render() {
		const { classes, partner, setProperty } = this.props;

		return (
			<div id="partner-details" className={classes.root}>
				<Typography classes={{ root: classes.title }}>CONTACTOS</Typography>
				<RadioGroup
					value={this.state.radioGroupValue}
					handleChange={this.radioHandleChange}
					formControlLabels={[
						{
							classes: { root: classes.formControlLabel },
							value: "0",
							control: <Radio />,
							label: "Faturar com esta morada",
						},
						{
							classes: { root: classes.formControlLabel },
							value: "1",
							control: <Radio />,
							label: "Faturar noutro nome",
						},
					]}
				/>
				<div className={classes.container}>
					<div className={classes.column}>
						<Input
							type="text"
							label={partner.address.road.label}
							value={partner.address.road.value}
							onChange={value => setProperty('address.road', value)}
							error={partner.address.road.error}
							// disabled={disabled}
							styles={classes.input}
						/>
						<div className={classes.row}>
							<Input
								type="text"
								label={partner.address.postCode.label}
								value={partner.address.postCode.value}
								onChange={value => setProperty('address.postCode', value)}
								error={partner.address.postCode.error}
								// disabled={disabled}
								styles={classes.rowInput}
							/>
							<Input
								type="text"
								label={partner.address.city.label}
								value={partner.address.city.value}
								onChange={value => setProperty('address.city', value)}
								error={partner.address.city.error}
							// disabled={disabled}
							/>
						</div>
						<DropDown
							label={partner.address.country.label}
							value={partner.address.country.value}
							onChange={value => setProperty('address.country', value)}
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
							label={partner.mobile.label}
							value={partner.mobile.value}
							onChange={value => setProperty('mobile', value)}
							error={partner.mobile.error}
						// disabled={disabled}
						/>
						<Input
							type="text"
							label={partner.phone.label}
							value={partner.phone.value}
							onChange={value => setProperty('phone', value)}
							error={partner.phone.error}
							// disabled={disabled}
							styles={classes.rowInput}
						/>
					</div>
					<div className={classes.column}>
						<Input
							type="text"
							label={partner.billing.name.label}
							value={partner.billing.name.value}
							onChange={value => setProperty('billing.name', value)}
							error={partner.billing.name.error}
							// disabled={disabled}
							styles={classes.rowInput}
						/>
						<Input
							type="text"
							label={partner.billing.nif.label}
							value={partner.billing.nif.value}
							onChange={value => setProperty('billing.nif', value)}
							error={partner.billing.nif.error}
							// disabled={disabled}
							styles={classes.rowInput}
						/>
						<Input
							type="text"
							label={partner.billing.address.road.label}
							value={partner.billing.address.road.value}
							onChange={value => setProperty('address.road', value)}
							error={partner.billing.address.road.error}
							// disabled={disabled}
							styles={classes.input}
						/>
						<div className={classes.row}>
							<Input
								type="text"
								label={partner.billing.address.postCode.label}
								value={partner.billing.address.postCode.value}
								onChange={value => setProperty('address.postCode', value)}
								error={partner.billing.address.postCode.error}
								// disabled={disabled}
								styles={classes.rowInput}
							/>
							<Input
								type="text"
								label={partner.billing.address.city.label}
								value={partner.billing.address.city.value}
								onChange={value => setProperty('address.city', value)}
								error={partner.billing.address.city.error}
							// disabled={disabled}
							/>
						</div>
						<DropDown
							label={partner.billing.address.country.label}
							value={partner.billing.address.country.value}
							onChange={value => setProperty('address.country', value)}
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
					</div>
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(PartnerDetails);
