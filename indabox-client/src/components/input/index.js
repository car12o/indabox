import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import s from './style.css';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';

const styles = {
	root: {
		width: '100%',
		marginTop: '10px',
	}
}

class Input extends Component {
	render() {
		const { classes, label, type, value, onChange, error } = this.props;

		return (
			<FormControl className={classes.root} variant="outlined" error={error ? true : false}>
				<InputLabel ref={ref => this.InputRef = ReactDOM.findDOMNode(ref)}>
					{label}
				</InputLabel>
				<OutlinedInput
					value={value}
					type={type ? type : 'text'}
					onChange={e => onChange(e.target.value)}
					labelWidth={this.InputRef ? this.InputRef.offsetWidth : 0}
				/>
				<FormHelperText id="component-error-text">{error}</FormHelperText>
			</FormControl>
		);
	}
}

export default withStyles(styles)(Input);
