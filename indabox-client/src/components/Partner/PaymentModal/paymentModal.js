import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Stamps from '../../Stamps';

const styles = {
    titleContainer: {
        backgroundImage: 'linear-gradient(to right, #DA2155, #6000AC)',
        padding: '5px 15px',
        width: '550px',
    },
    title: {
        color: 'white',
        margin: '0px',
    },
    bodyContainer: {
        margin: '25px 0',
        display: 'flex',
    },
    classLabel: {
        marginRight: '5px',
    },
    classText: {
        marginRight: '35px',
    },
};

class SimpleDialog extends React.Component {
    handleClose = () => {
        this.props.onClose(this.props.selectedValue);
    };

    handleListItemClick = value => {
        this.props.onClose(value);
    };

    render() {
        const { classes, onClose, selectedValue, payment, ...other } = this.props;
        const { createdBy, createdAt, type, updatedAt, status, quotas, value } = payment || {};

        return (
            <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
                <DialogTitle classes={{ root: classes.titleContainer }}>
                    <p className={classes.title}>Detalhes do pagamento</p>
                </DialogTitle>
                <div>
                    <div className={classes.bodyContainer}>
                        <Stamps
                            firstLabel="Criado por:"
                            firstValue={createdBy}
                            classLabel={classes.classLabel}
                            classText={classes.classText}
                        />
                        <Stamps
                            firstLabel="Data criação:"
                            firstValue={createdAt}
                            classLabel={classes.classLabel}
                            classText={classes.classText}
                        />
                    </div>
                    <div className={classes.bodyContainer}>
                        <Stamps
                            firstLabel="Tipo:"
                            firstValue={type}
                            classLabel={classes.classLabel}
                            classText={classes.classText}
                        />
                        <Stamps
                            firstLabel="Data pagamento:"
                            firstValue={updatedAt}
                            classLabel={classes.classLabel}
                            classText={classes.classText}
                        />
                    </div>
                    <div className={classes.bodyContainer}>
                        <Stamps
                            firstLabel="Estado:"
                            firstValue={status ? status.label : ''}
                            classLabel={classes.classLabel}
                            classText={classes.classText}
                        />
                    </div>
                    <div className={classes.bodyContainer}>
                        <Stamps
                            firstLabel="Quotas:"
                            firstValue={quotas ? quotas.map(q => q.year).join(',') : ''}
                            classLabel={classes.classLabel}
                            classText={classes.classText}
                        />
                        <Stamps
                            firstLabel="Valor total:"
                            firstValue={`${value}€`}
                            classLabel={classes.classLabel}
                            classText={classes.classText}
                        />
                    </div>
                    {/* <div className={classes.bodyContainer}>
                        <Stamps
                            firstLabel="Dados de pagamento:"
                            firstValue="{createdBy}"
                            classLabel={classes.classLabel}
                            classText={classes.classText}
                        />
                    </div> */}
                </div>
            </Dialog>
        );
    }
}

export default withStyles(styles)(SimpleDialog);