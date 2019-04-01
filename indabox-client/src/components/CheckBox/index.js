import React, { Component } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

class CheckBox extends Component {
	render() {
		let { label, onChange, value, disabled } = this.props;

		return (
			<FormControlLabel
				control={
					<Checkbox
						checked={value}
						onChange={disabled ? () => { } : e => onChange(!value)}
						disableRipple={disabled}
					/>
				}
				label={label}
			/>
		);
	}
}

export default CheckBox;
