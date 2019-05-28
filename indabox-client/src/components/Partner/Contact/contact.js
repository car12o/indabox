import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '../../RadioGroup/radioGroup';
import Radio from '@material-ui/core/Radio';
import Input from '../../Input';
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
		const { classes } = this.props;

		return (
			<div id="partner-details" className={classes.root}>
				<Typography classes={{ root: classes.title }}>CONTACTOS</Typography>
				<RadioGroup
					value={this.state.radioGroupValue}
					handleChange={this.radioHandleChange}
					formControlLabels={[
						(<FormControlLabel
							classes={{ root: classes.formControlLabel }}
							value="0"
							control={<Radio />}
							label="Faturar com esta morada"
						/>),
						(<FormControlLabel
							classes={{ root: classes.formControlLabel }}
							value="1"
							control={<Radio />}
							label="Faturar noutro nome"
						/>)
					]}
				/>
				<div className={classes.container}>
					<div className={classes.column}>
						<Input
							type="text"
							label="test"
						// disabled={disabled}
						// value={partner.firstName.value}
						// onChange={actions.setFirstName}
						// error={partner.firstName.error}
						// styles={classes.input}
						/>
						<div className={classes.row}>
							<Input
								type="text"
								label="test"
								// disabled={disabled}
								// value={partner.firstName.value}
								// onChange={actions.setFirstName}
								// error={partner.firstName.error}
								styles={classes.rowInput}
							/>
							<Input
								type="text"
								label="test"
							// disabled={disabled}
							// value={partner.firstName.value}
							// onChange={actions.setFirstName}
							// error={partner.firstName.error}
							// styles={classes.input}
							/>
						</div>
						<DropDown
							label="Titulo"
							// disabled={disabled}
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
							label="test"
						// disabled={disabled}
						// value={partner.firstName.value}
						// onChange={actions.setFirstName}
						// error={partner.firstName.error}
						// styles={classes.input}
						/>
						<Input
							type="text"
							label="test"
						// disabled={disabled}
						// value={partner.firstName.value}
						// onChange={actions.setFirstName}
						// error={partner.firstName.error}
						// styles={classes.input}
						/>
					</div>
					<div className={classes.column}>
						<Input
							type="text"
							label="test"
						// disabled={disabled}
						// value={partner.firstName.value}
						// onChange={actions.setFirstName}
						// error={partner.firstName.error}
						// styles={classes.input}
						/>
						<Input
							type="text"
							label="test"
						// disabled={disabled}
						// value={partner.firstName.value}
						// onChange={actions.setFirstName}
						// error={partner.firstName.error}
						// styles={classes.input}
						/>
						<Input
							type="text"
							label="test"
						// disabled={disabled}
						// value={partner.firstName.value}
						// onChange={actions.setFirstName}
						// error={partner.firstName.error}
						// styles={classes.input}
						/>
						<div className={classes.row}>
							<Input
								type="text"
								label="test"
								// disabled={disabled}
								// value={partner.firstName.value}
								// onChange={actions.setFirstName}
								// error={partner.firstName.error}
								styles={classes.rowInput}
							/>
							<Input
								type="text"
								label="test"
							// disabled={disabled}
							// value={partner.firstName.value}
							// onChange={actions.setFirstName}
							// error={partner.firstName.error}
							/>
						</div>
						<DropDown
							label="Titulo"
							// disabled={disabled}
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
					</div>
				</div>

			</div>
		);
	}
}

export default withStyles(styles)(PartnerDetails);
