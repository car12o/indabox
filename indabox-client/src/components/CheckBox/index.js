import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const styles = {
	root: {
		padding: '0 30px'
	}
}

class CheckBox extends Component {
	render() {
		let { classes, label, onChange, value, disabled } = this.props;

		return (
			<FormControlLabel className={classes.root}
				control={
					<Checkbox
						checked={value}
						onChange={disabled ? () => { } : e => onChange(e.target.value)}
						disableRipple={disabled}
					/>
				}
				label={label}
			/>
		);
	}
}

export default withStyles(styles)(CheckBox);
