import React, { Component } from 'react';
import { withTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';

const styles = {
	root: {
		margin: '10px 0 20px 0',
	}
};

class TextArea extends Component {
	render() {
		const { classes, theme, label, value, onChange, disabled, helperText } = this.props;

		return (
			<FormControl classes={{ root: classes.root }} variant="outlined" >
				<TextField
					id="outlined-multiline-flexible"
					label={label}
					multiline
					InputLabelProps={{
						style: { color: theme.palette.primary.main }
					}}
					rows="12"
					rowsMax="25"
					value={value}
					onChange={e => onChange(e.target.value)}
					className={classes.textField}
					helperText={helperText}
					variant="outlined"
					disabled={disabled}
				/>
			</FormControl>
		);
	}
}

export default withTheme()(withStyles(styles)(TextArea));
