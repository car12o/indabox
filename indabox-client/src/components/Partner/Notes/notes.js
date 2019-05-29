import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextArea from '../../TextArea/textArea';
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
	textArea: {
		width: '800px',
		margin: '25px 50px',
	}
});

class PartnerDetails extends Component {
	render() {
		const { classes, partner, setProperty } = this.props;

		return (
			<div id="partner-details" className={classes.root}>
				<Typography classes={{ root: classes.title }}>NOTAS</Typography>
				<TextArea
					label={partner.notes.label}
					value={partner.notes.value}
					onChange={value => setProperty('notes', value)}
					// disabled={disabled}
					styles={classes.textArea}
				/>
			</div>
		);
	}
}

export default withStyles(styles)(PartnerDetails);