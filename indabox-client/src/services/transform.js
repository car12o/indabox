import _ from 'lodash/fp';

/**
 * createQuotas ...
 * @param {object} quotas 
 */
const createQuotas = quotas => quotas.map(quota => ({
    id: quota._id,
    year: quota.year,
    value: quota.value,
    payment: quota.payment,
    invoiceEmited: quota.invoiceEmited,
    createdAt: quota.createdAt,
    updatedAt: quota.updatedAt
}));

/**
 * createUser ...
 * @param {object} user 
 */
const createUser = user => ({
    logged: _.getOr(false, 'logged', user),
    id: user.id || '',
    number: _.getOr(0, 'number', user),
    type: {
        label: 'Tipo de sócio',
        value: user.type || '',
    },
    alerts: {
        label: 'Receber alertas',
        value: _.getOr(false, 'alerts', user),
    },
    newsletter: {
        label: 'Receber newsletters',
        value: _.getOr(false, 'newsletter', user),
    },
    firstName: {
        label: 'Nome',
        value: user.firstName || '',
        error: null
    },
    lastName: {
        label: 'Apelido',
        value: user.lastName || '',
        error: null
    },
    nif: {
        label: 'NIF',
        value: user.nif || '',
        error: null
    },
    email: {
        label: 'Endereço de email',
        value: user.email || '',
        error: null
    },
    password: {
        label: 'Palavra chave',
        value: user.password || '',
        error: null
    },
    phone: {
        label: 'Telefone',
        value: user.phone || '',
        error: null
    },
    address: {
        label: 'Morada',
        value: user.address || '',
        error: null
    },
    postCode: {
        label: 'Código de Postal',
        value: user.postCode || '',
        error: null
    },
    city: {
        label: 'Localidade',
        value: user.city || '',
        error: null
    },
    country: {
        label: 'Pais',
        value: user.country || '',
        error: null
    },
    notes: {
        label: 'Notas',
        value: user.notes || '',
        error: null
    },
    createdBy: user.createdBy || '',
    createdAt: user.createdAt || '',
    updatedBy: user.updatedBy || '',
    updatedAt: user.updatedAt || '',
    quotas: user.quotas ? createQuotas(user.quotas) : [],
});

/**
 * setUserErrors ...
 * @param {object} state
 * @param {object} errors
 */
const setUserErrors = (state, errors) => errors.reduce((accm, e) => {
    const { key, err } = e;
    if (_.has(`${key}.value`, accm)) {
        const prop = Object.assign({}, accm[key], { error: err });
        return Object.assign({}, accm, { [key]: prop });
    }
    return accm;
}, Object.assign({}, state));

export { createUser, setUserErrors };
