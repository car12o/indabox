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

const createPartner = partner => ({
    id: partner.id || '',
    number: partner.number || '',
    type: partner.type || '',
    alerts: {
        label: 'Receber alertas',
        value: partner.alerts || false,
    },
    newsletter: {
        label: 'Receber newsletters',
        value: partner.newsletter || false,
    },
    firstName: {
        label: 'Nome',
        value: partner.firstName || '',
        error: null
    },
    lastName: {
        label: 'Apelido',
        value: partner.lastName || '',
        error: null
    },
    nif: {
        label: 'NIF',
        value: partner.nif || '',
        error: null
    },
    email: {
        label: 'Endereço de email',
        value: partner.email || '',
        error: null
    },
    phone: {
        label: 'Telefone',
        value: partner.phone || '',
        error: null
    },
    address: {
        label: 'Morada',
        value: partner.address || '',
        error: null
    },
    postCode: {
        label: 'Código de Postal',
        value: partner.postCode || '',
        error: null
    },
    city: {
        label: 'Localidade',
        value: partner.city || '',
        error: null
    },
    country: {
        label: 'Pais',
        value: partner.country || '',
        error: null
    },
    notes: {
        label: 'Notas',
        value: partner.notes || '',
        error: null
    },
    createdBy: partner.createdBy || '',
    createdAt: partner.createdAt || '',
    updatedBy: partner.updatedBy || '',
    updatedAt: partner.updatedAt || '',
    quotas: createQuotas() || [],
});

export { createPartner };