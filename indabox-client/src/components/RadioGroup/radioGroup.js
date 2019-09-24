import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const styles = {
    formControl: {
        width: '100%',
    },
    group: {
        display: 'flex',
        flexDirection: 'row',
    },
    cursorDefault: {
        cursor: 'default',
    }
};

class RadioButtonsGroup extends React.Component {
    render() {
        const { classes, styles, formControlLabels, value, handleChange, disabled } = this.props;

        return (
            <div className={styles}>
                <FormControl component="fieldset" className={classes.formControl}>
                    <RadioGroup
                        className={classes.group}
                        value={value}
                        onChange={disabled ? () => { } : e => handleChange(e.target.value)}
                    >
                        {formControlLabels.map((props, i) =>
                            <FormControlLabel
                                key={i}
                                classes={{ root: classNames(props.classes, { [classes.cursorDefault]: disabled }) }}
                                value={props.value}
                                control={<Radio classes={{ root: classNames({ [classes.cursorDefault]: disabled }) }} />}
                                label={props.label}
                            />)}
                    </RadioGroup>
                </FormControl>
            </div>
        );
    }
}

export default withStyles(styles)(RadioButtonsGroup);