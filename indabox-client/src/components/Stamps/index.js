import React, { Component } from 'react';
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
		marginRight: '25px',
		color: theme.palette.secondary.main,
	},
	text: {
		color: theme.palette.primary.main,
	}
});

class Stamps extends Component {
	render() {
		const { classes, addedBy, addedWhen } = this.props;

		return (
			<div className={classes.root}>
				<div className={classes.stamps}>
					<Typography className={classes.label} component="p">
						Adicionado por
					</Typography>
					<Typography className={classes.label} component="p">
						em
					</Typography>
				</div>
				<div className={classes.stamps}>
					<Typography className={classes.text} component="p">
						{addedBy}
					</Typography>
					<Typography className={classes.text} component="p">
						{addedWhen}
					</Typography>
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(Stamps);
