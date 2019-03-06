import React, { Component } from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
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
		width: '37%',
		display: 'flex',
		flexDirection: 'column',
		borderTop: `1px solid ${theme.palette.secondary.light}`,
		padding: '0 10% 0 30px',
	},
	titleContainerCenter: {
		borderLeft: `1px solid ${theme.palette.secondary.light}`,
		borderRight: `1px solid ${theme.palette.secondary.light}`,
	},
	titleContainerLast: {
		width: '26%',
		padding: '0 4% 0 30px',
	},
	title: {
		padding: '10px 10px',
		fontSize: '14px',
		marginBottom: '10px',
		color: 'white',
	},
	checkBoxContainer: {
		display: 'flex',
		flexDirection: 'row',
		marginBottom: '10px',
	},
	label: {
		color: theme.palette.primary.main
	},
	bottomLabels: {
		marginRight: '60px',
	}
});

class PartnerDetails extends Component {
	render() {
		const { classes, partner } = this.props;

		return (
			<div id="partner-details" className={classes.root}>
				<div className={classes.titleContainer}>
					<span className={classes.title}>INDENTIFICAÇÃO</span>
					<Input
						type="text"
						label={partner.firstName.label}
						disabled
						value={partner.firstName.value}
						// onChange={setPassword}
						error={partner.firstName.error}
					/>
					<Input
						type="text"
						label={partner.lastName.label}
						disabled
						value={partner.lastName.value}
						// onChange={setPassword}
						error={partner.lastName.error}
					/>
					<Input
						type="text"
						label={partner.nif.label}
						disabled
						value={partner.nif.value}
						// onChange={setPassword}
						error={partner.nif.error}
					/>
					<Input
						type="text"
						label={partner.email.label}
						disabled
						value={partner.email.value}
						// onChange={setPassword}
						error={partner.email.error}
					/>
					<div className={classes.checkBoxContainer}>
						<CheckBox
							label={partner.alerts.label}
							value={partner.alerts.value}
							disabled
						/>
						<CheckBox
							label={partner.newsletter.label}
							value={partner.newsletter.value}
							disabled
						/>
					</div>
					<Input
						type={partner.phone.label}
						label="Telefone"
						disabled
						value={partner.phone.value}
						// onChange={setPassword}
						error={partner.phone.error}
					/>
					<div className={classes.checkBoxContainer}>
						<div className={classes.bottomLabels}>
							<span className={classes.label}>Nº de sócio</span>
							<p>{partner.number}</p>
						</div>
						<div>
							<span className={classes.label}>Tipo de sócio</span>
							<p>{partner.type}</p>
						</div>
					</div>
				</div>
				<div className={classNames(classes.titleContainer, classes.titleContainerCenter)}>
					<span className={classes.title}>DADOS DE FATURAÇÃO</span>
					<Input
						type="text"
						label={partner.address.label}
						disabled
						value={partner.address.value}
						// onChange={setPassword}
						error={partner.address.error}
					/>
					<Input
						type="text"
						label={partner.postCode.label}
						disabled
						value={partner.postCode.value}
						// onChange={setPassword}
						error={partner.postCode.error}
					/>
					<Input
						type="text"
						label={partner.city.label}
						disabled
						value={partner.city.value}
						// onChange={setPassword}
						error={partner.city.error}
					/>
					<DropDown
						label={partner.country.label}
						value={partner.country.value}
						disabled
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
						disabled
						value={partner.notes.value}
						error={partner.notes.error}
					/>
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(PartnerDetails);
