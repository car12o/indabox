import _ from 'lodash/fp';

const createQuotas = () => [
    {
        id: '#335',
        year: 2019,
        state: 'Pago',
        value: {
            amount: 60,
            label: '60€',
        },
        invoiceEmitted: false,
        paymentType: 'MB'
    },
    {
        id: '#334',
        year: 2018,
        state: 'Pago',
        value: {
            amount: 60,
            label: '60€',
        },
        invoiceEmitted: false,
        paymentType: 'MB'
    },
    {
        id: '#333',
        year: 2017,
        state: 'Pago',
        value: {
            amount: 60,
            label: '60€',
        },
        invoiceEmitted: false,
        paymentType: 'MB'
    },
    {
        id: '#332',
        year: 2016,
        state: 'Pago',
        value: {
            amount: 60,
            label: '60€',
        },
        invoiceEmitted: false,
        paymentType: 'MB'
    },
];

export { createQuotas };