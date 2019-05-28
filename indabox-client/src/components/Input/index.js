import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { withTheme, withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';

const styles = {
	root: {
		width: '100%',
	}
}

class Input extends Component {
	render() {
		const { classes, theme, label, type, value, onChange, error, disabled, styles } = this.props;

		return (
			<div className={classNames(classes.root, styles)}>
				<FormControl classes={{ root: classes.root }} variant="outlined" error={error ? true : false}>
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
			</div>
		);
	}
}

export default withTheme()(withStyles(styles)(Input));
