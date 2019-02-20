import React, { Component } from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Input from '../Input';
import CheckBox from '../CheckBox';
import DropDown from '../DropDown';
import TextArea from '../TextArea';
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
		const { classes } = this.props;

		return (
			<div id="partner-details" className={classes.root}>
				<div className={classes.titleContainer}>
					<span className={classes.title}>INDENTIFICAÇÃO</span>
					<Input
						type="text"
						label="Nome"
						disabled
					// value={user.password.value}
					// onChange={setPassword}
					// error={user.password.error}
					/>
					<Input
						type="text"
						label="Apelido"
						disabled
					// value={user.password.value}
					// onChange={setPassword}
					// error={user.password.error}
					/>
					<Input
						type="text"
						label="NIF"
						disabled
					// value={user.password.value}
					// onChange={setPassword}
					// error={user.password.error}
					/>
					<Input
						type="text"
						label="Endereço de email"
						disabled
					// value={user.password.value}
					// onChange={setPassword}
					// error={user.password.error}
					/>
					<div className={classes.checkBoxContainer}>
						<CheckBox label="Receber alertas" />
						<CheckBox label="Receber newsletters" />
					</div>
					<Input
						type="text"
						label="Telefone"
						disabled
					// value={user.password.value}
					// onChange={setPassword}
					// error={user.password.error}
					/>
					<div className={classes.checkBoxContainer}>
						<div className={classes.bottomLabels}>
							<span className={classes.label}>Nº de sócio</span>
							<p>178</p>
						</div>
						<div>
							<span className={classes.label}>Tipo de sócio</span>
							<p>Sócio Titular</p>
						</div>
					</div>
				</div>
				<div className={classNames(classes.titleContainer, classes.titleContainerCenter)}>
					<span className={classes.title}>DADOS DE FATURAÇÃO</span>
					<Input
						type="text"
						label="Morada"
						disabled
					// value={user.password.value}
					// onChange={setPassword}
					// error={user.password.error}
					/>
					<Input
						type="text"
						label="Codigo postal"
						disabled
					// value={user.password.value}
					// onChange={setPassword}
					// error={user.password.error}
					/>
					<Input
						type="text"
						label="Localidade"
						disabled
						value=""
					// onChange={setPassword}
					// error={user.password.error}
					/>
					<DropDown
						label="Pais"
						value=""
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
						label="Notas"
						disabled
					/>
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(PartnerDetails);
