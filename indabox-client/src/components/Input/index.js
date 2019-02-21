import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';

const styles = {
	root: {
		width: '100%',
		marginTop: '10px',
	},
}

class Input extends Component {
	render() {
		const { classes, theme, label, type, value, onChange, error, disabled } = this.props;

		return (
			<FormControl className={classes.root} variant="outlined" error={error ? true : false}>
				<InputLabel ref={ref => this.InputRef = ReactDOM.findDOMNode(ref)}>
					{label}
				</InputLabel>
				<OutlinedInput
					inputProps={{
						style: { color: theme.palette.secondary.main }
					}}
					value={value}
					type={type ? type : 'text'}
					onChange={e => onChange(e.target.value)}
					labelWidth={this.InputRef ? this.InputRef.offsetWidth : 0}
					disabled={disabled}
				>
				</OutlinedInput>
				<FormHelperText id="component-error-text">{error}</FormHelperText>
			</FormControl>
		);
	}
}

export default withTheme()(withStyles(styles)(Input));
