import fp from 'lodash/fp';

/**
 * createQuotas ...
 * @param {object} quotas 
 */
const createQuotas = quotas => {
    if (quotas) {
        return quotas.map(quota => ({
            id: quota._id || '',
            year: quota.year || '',
            value: quota.value || '',
            payment: quota.payment || null,
            createdAt: quota.createdAt || null,
            updatedAt: quota.updatedAt || null,
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
    createdBy: user.createdBy || 'Imported',
    updatedBy: user.updatedBy || 'Imported',
    deletedBy: user.deletedBy || 'Imported',
    deletedAt: user.deletedAt || null,
    createdAt: user.createdAt || null,
    updatedAt: user.updatedAt || null,
    quotas: createQuotas(user.quotas),
});

export { createUser };
