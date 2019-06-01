import React, { Component } from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
	root: {
		display: 'flex',
	},
	stamps: {
		display: 'flex',
		flexDirection: 'column',
	},
	label: {
		width: '110px',
		textAlign: 'end',
		color: theme.palette.secondary.main,
	},
	text: {
		color: theme.palette.primary.main,
	}
});

class Stamps extends Component {
	render() {
		const { classes, firstLabel, firstValue, secoundLabel, secoundValue, classLabel, classText } = this.props;

		return (
			<div className={classes.root}>
				<div className={classes.stamps}>
					<Typography className={classNames(classes.label, classLabel)} component="p">
						{firstLabel}
					</Typography>
					<Typography className={classNames(classes.label, classLabel)} component="p">
						{secoundLabel}
					</Typography>
				</div>
				<div className={classes.stamps}>
					<Typography className={classNames(classes.text, classText)} component="p">
						{firstValue || 'Importado'}
					</Typography>
					<Typography className={classNames(classes.text, classText)} component="p">
						{secoundValue}
					</Typography>
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(Stamps);
