import fp from 'lodash/fp';
const transform = fp.transform.convert({ 'cap': false });

const formatDate = (date) => {
    if (date) {
        return new Date(date).toLocaleString('pt-PT');
    }
    return null;
};

/**
 * createQuotas ...
 * @param {object} quotas 
 */
const createQuotas = quotas => {
    if (quotas) {
        return quotas.map(quota => ({
            id: quota._id || '',
            year: quota.year || '',
            value: quota.value || 0,
            payment: quota.payment
                ? Object.assign({}, quota.payment, { updatedAt: formatDate(quota.payment.updatedAt) })
                : null,
            createdAt: formatDate(quota.createdAt),
            updatedAt: formatDate(quota.updatedAt),
        }));
    }

    return [];
};

/**
 * createPayments ...
 * @param {object} payments 
 */
const createPayments = payments => {
    if (payments) {
        return payments.map(payment => ({
            id: payment._id || '',
            status: payment.status || null,
            invoiceEmited: payment.invoiceEmited || false,
            quotas: payment.quotas || [],
            mbReference: payment.mbReference || null,
            type: payment.type || 'Importado',
            value: payment.value || 0,
            createdBy: payment.createdBy || 'Importado',
            updatedBy: payment.updatedBy || 'Importado',
            createdAt: formatDate(payment.createdAt),
            updatedAt: formatDate(payment.updatedAt),
        }));
    }

    return [];
};


/**
 * createUser ...
 * @param {object} user 
 */
const createUser = user => ({
    logged: user.logged || false,
    id: fp.getOr('', '_id', user),
    role: {
        label: 'Tipo de sócio',
        value: {
            label: fp.getOr('', 'role.label', user),
            value: fp.getOr(100, 'role.value', user),
        },
    },
    address: {
        road: {
            label: 'Morada',
            value: fp.getOr('', 'address.road', user),
            error: null,
        },
        postCode: {
            label: 'Código de Postal',
            value: fp.getOr('', 'address.postCode', user),
            error: null,
        },
        city: {
            label: 'Localidade',
            value: fp.getOr('', 'address.city', user),
            error: null,
        },
        country: {
            label: 'País',
            value: fp.getOr('', 'address.country', user),
        },
    },
    billing: {
        address: {
            road: {
                label: 'Morada',
                value: fp.getOr('', 'billing.address.road', user),
                error: null,
            },
            postCode: {
                label: 'Código de Postal',
                value: fp.getOr('', 'billing.address.postCode', user),
                error: null,
            },
            city: {
                label: 'Localidade',
                value: fp.getOr('', 'billing.address.city', user),
                error: null,
            },
            country: {
                label: 'País',
                value: fp.getOr('', 'billing.address.country', user),
            },
        },
        name: {
            label: 'Nome ou Empresa',
            value: fp.getOr('', 'billing.name', user),
            error: null,
        },
        nif: {
            label: 'NIF',
            value: fp.getOr('', 'billing.nif', user),
            error: null,
        },
        active: fp.getOr(false, 'billing.active', user),
    },
    number: {
        label: 'Nº de sócio',
        value: user.number || 0,
        error: null,
    },
    title: {
        label: 'Título',
        value: user.title || '',
    },
    firstName: {
        label: 'Nome',
        value: user.firstName || '',
        error: null,
    },
    lastName: {
        label: 'Apelido',
        value: user.lastName || '',
        error: null,
    },
    nif: {
        label: 'NIF',
        value: user.nif || '',
        error: null,
    },
    email: {
        label: 'Endereço de email',
        value: user.email || '',
        error: null,
    },
    password: {
        label: 'Senha',
        value: user.password || '',
        error: null,
    },
    rePassword: {
        label: 'Repetir Senha',
        value: user.rePassword || '',
        error: null,
    },
    ballotNumber: {
        label: 'Nº de cédula',
        value: user.ballotNumber || '',
        error: null,
    },
    specialty: {
        label: 'Especialidade profissional',
        value: user.specialty || '',
        error: null,
    },
    specialtySessions: {
        label: 'Secções especializadas',
        value: user.specialtySessions || '',
        error: null,
    },
    newsletter: {
        label: 'Receber newsletters',
        value: user.newsletter || false,
    },
    alerts: {
        label: 'Receber alertas',
        value: user.alerts || false,
    },
    phone: {
        label: 'Telefone',
        value: user.phone || '',
        error: null,
    },
    mobile: {
        label: 'Telemóvel ',
        value: user.mobile || '',
        error: null,
    },
    notes: {
        label: 'Notas',
        value: user.notes || '',
        error: null,
    },
    createdBy: user.createdBy || 'Importado',
    updatedBy: user.updatedBy || 'Importado',
    deletedBy: user.deletedBy || null,
    deletedAt: formatDate(user.deletedAt),
    createdAt: formatDate(user.createdAt),
    updatedAt: formatDate(user.updatedAt),
    quotas: createQuotas(user.quotas),
    payments: createPayments(user.payments),
});

/**
 * cleanUserToSubmit ...
 * @param {object} user 
 */
const cleanUserToSubmit = user => {
    const {
        id,
        role,
        password,
        rePassword,
        quotas,
        payments,
        logged,
        createdAt,
        createdBy,
        updatedAt,
        updatedBy,
        deletedBy,
        ...rest } = user;

    const result = transform((accum, prop, key) => {
        if (prop || fp.isBoolean(prop)) {
            if (fp.isObject(prop)) {
                if (fp.has('value', prop)) {
                    return Object.assign(accum, { [key]: prop.value });
                }

                return Object.assign(accum, { [key]: cleanUserToSubmit(prop) });
            }

            return Object.assign(accum, { [key]: prop });
        }

        return accum;
    }, {}, rest);

    return result;
}

export { createUser, cleanUserToSubmit };
