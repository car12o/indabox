import React, { Component } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

class CheckBox extends Component {
	render() {
		const { label, onChange, value, checked } = this.props;

		return (
			<FormControlLabel
				control={
					<Checkbox
						checked={checked}
						onChange={e => onChange(e.target.value)}
						value={value}
					/>
				}
				label={label}
			/>
		);
	}
}

export default CheckBox;
