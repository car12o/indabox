import React, { Component } from 'react';
import { withTheme, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

const styles = {
	root: {
		width: '100%',
	}
}

class DropDown extends Component {
	render() {
		const { classes, theme, label, value, options, onChange, disabled } = this.props;

		return (
			<FormControl className={classes.root} variant="outlined" >
				<TextField
					select
					InputLabelProps={{
						style: { color: theme.palette.primary.main }
					}}
					InputProps={{
						style: { color: theme.palette.secondary.main }
					}}
					variant="outlined"
					label={label}
					value={value}
					onChange={e => onChange(e.target.value)}
					disabled={disabled}
				>
					{options.map(option => (
						<MenuItem key={option.value} value={option.value}>
							{option.label}
						</MenuItem>
					))}
				</TextField>
			</FormControl>
		);
	}
}

export default withTheme()(withStyles(styles)(DropDown));
