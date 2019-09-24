import React, { Component } from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
	root: {
		display: 'flex',
		flexDirection: 'row',
		width: '100%'
	},
	rootFlexColumn: {
		flexDirection: 'column',
	},
	stamps: {
		display: 'flex',
		flexDirection: 'column',
	},
	label: {
		width: '100%',
		textAlign: 'end',
		marginRight: '15px',
		color: theme.palette.primary.main,
	},
	labelFlexColumn: {
		textAlign: 'initial'
	},
	value: {
		width: '100%',
		color: theme.palette.secondary.main,
	}
});

class Stamps extends Component {
	render() {
		const { classes, label, value, flexColumn } = this.props;

		return (
			<div className={classNames(classes.root, { [classes.rootFlexColumn]: flexColumn })}>
				<Typography className={classNames(classes.label, { [classes.labelFlexColumn]: flexColumn })} component="p">
					{label}
				</Typography>
				<Typography className={classNames(classes.value)} component="p">
					{value}
				</Typography>
			</div>
		);
	}
}

export default withStyles(styles)(Stamps);
