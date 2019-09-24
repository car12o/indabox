import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Stamp from '../../Stamp/stamp';

const styles = {
    titleContainer: {
        backgroundImage: 'linear-gradient(to right, #DA2155, #6000AC)',
        padding: '5px 15px',
        width: '600px',
    },
    title: {
        color: 'white',
        margin: '0px',
    },
    bodyColumn: {
        display: 'flex',
        flexDirection: 'column',
        margin: '15px'
    },
    bodyRow: {
        display: 'flex',
        flexDirection: 'row',
        margin: '15px'
    },
    bodyContainer: {
        margin: '15px 50px'
    },
    stamp: {
        marginLeft: '50px',
    },
    paymentDetails: {
        width: 'auto',
        textAlign: 'initial',
    },
    paymentDetailsMargin: {
        marginTop: '5px',
    },
    paymentDetailsImg: {
        width: '150px',
        margin: '10px 0'
    }
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
        const { createdBy, createdAt, paymentDate, type, status, quotas, value, mbReference } = payment || {};

        return (
            <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other} classes={{ root: classes.root }}>
                <DialogTitle classes={{ root: classes.titleContainer }}>
                    <p className={classes.title}>Detalhes do pagamento</p>
                </DialogTitle>
                <div className={classNames(classes.bodyContainer, classes.bodyColumn)}>
                    <div className={classes.bodyRow}>
                        <Stamp
                            label="Criado por:"
                            value={createdBy}
                            flexColumn
                        />
                        <Stamp
                            classes={{ root: classes.stamp }}
                            label="Tipo:"
                            value={type}
                            flexColumn
                        />

                    </div>
                    <div className={classes.bodyRow}>
                        <Stamp
                            label="Data criação:"
                            value={createdAt}
                            flexColumn
                        />
                        <Stamp
                            classes={{ root: classes.stamp }}
                            label="Data pagamento:"
                            value={paymentDate}
                            flexColumn
                        />
                    </div>
                    <div className={classes.bodyRow}>
                        <Stamp
                            label="Estado:"
                            value={status ? status.label : ''}
                            flexColumn
                        />
                    </div>
                    <div className={classes.bodyRow}>
                        <Stamp
                            label="Quotas:"
                            value={quotas ? quotas.map(q => q.year).join(',') : ''}
                            flexColumn
                        />
                        <Stamp
                            classes={{ root: classes.stamp }}
                            label="Valor total:"
                            value={`${value}€`}
                            flexColumn
                        />
                    </div>
                    {(() => {
                        if (mbReference) {
                            return (
                                <div className={classes.bodyColumn}>
                                    <Stamp
                                        label="Dados de pagamento:"
                                        flexColumn
                                    />
                                    <img className={classes.paymentDetailsImg} src="/assets/mb.png" alt="" />
                                    <Stamp
                                        classes={{
                                            label: classNames(classes.paymentDetails, classes.paymentDetailsMargin),
                                            value: classes.paymentDetailsMargin
                                        }}
                                        label="Entidade:"
                                        value={mbReference.ententy}
                                    />
                                    <Stamp
                                        classes={{
                                            label: classNames(classes.paymentDetails, classes.paymentDetailsMargin),
                                            value: classes.paymentDetailsMargin
                                        }}
                                        label="Referência:"
                                        value={mbReference.reference}
                                    />
                                    <Stamp
                                        classes={{
                                            label: classNames(classes.paymentDetails, classes.paymentDetailsMargin),
                                            value: classes.paymentDetailsMargin
                                        }}
                                        label="Valor:"
                                        value={`${mbReference.value}€`}
                                    />
                                </div>
                            )
                        }
                    })()}
                </div>
            </Dialog>
        );
    }
}

export default withStyles(styles)(SimpleDialog);
