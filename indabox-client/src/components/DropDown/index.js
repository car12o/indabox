import React, { Component } from 'react';
import { withTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

class DropDown extends Component {
	render() {
		const { theme, label, value, options, onChange, disabled } = this.props;

		return (
			<FormControl variant="outlined" >
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

export default withTheme()(DropDown);
