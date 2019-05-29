import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const styles = theme => ({
    formControl: {
        width: '100%',
    },
    group: {
        display: 'flex',
        flexDirection: 'row',
    },
});

class RadioButtonsGroup extends React.Component {
    render() {
        const { classes, styles, formControlLabels, value, handleChange } = this.props;

        return (
            <div className={styles}>
                <FormControl component="fieldset" className={classes.formControl}>
                    <RadioGroup
                        className={classes.group}
                        value={value}
                        onChange={handleChange}
                    >
                        {formControlLabels.map((props, i) =>
                            <FormControlLabel
                                key={i}
                                classes={props.classes}
                                value={props.value}
                                control={props.control}
                                label={props.label}
                            />)}
                    </RadioGroup>
                </FormControl>
            </div>
        );
    }
}

RadioButtonsGroup.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RadioButtonsGroup);