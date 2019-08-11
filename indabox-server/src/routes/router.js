const router = require('express').Router();
const users = require('express').Router();
const payments = require('express').Router();
const Auth = require('../middleware/auth');
const validation = require('../middleware/validation');
const GeneralController = require('../controllers/general');
const UsersController = require('../controllers/users');
const Payment = require('../controllers/payment');
const APIError = require('../services/error');
const { userRoles, userSchema, userCreateSchema } = require('../models/user');
const { paymentCreateSchema, paymentInvoiceSchema } = require('../models/payment');

/**
 * users ...
 */
users.get('/', Auth.authorization(userRoles.admin), UsersController.getAll);
users.get('/:userId', Auth.authorization(userRoles.holder), UsersController.get);
users.post('/', Auth.authorization(userRoles.admin), validation(userCreateSchema), UsersController.create);
users.patch('/:userId', Auth.authorization(userRoles.holder), validation(userSchema), UsersController.update);

/**
 * payments ...
 */
payments.post('/', Auth.authorization(userRoles.admin), validation(paymentCreateSchema), Payment.create);
payments.delete('/:id', Auth.authorization(userRoles.admin), Payment.delete);
payments.patch('/invoice/:id', Auth.authorization(userRoles.admin),
    validation(paymentInvoiceSchema), Payment.updateInvoice);

/**
 * router ...
 */
router.use('/users', users);
router.use('/payments', payments);

router.get('/titles', Auth.authorization(userRoles.holder), UsersController.getTitles);
router.get('/roles', Auth.authorization(userRoles.holder), UsersController.getRoles);
router.get('/countries', Auth.authorization(userRoles.holder), UsersController.getCountries);

router.get('/state', Auth.authorization(userRoles.holder), GeneralController.state);
router.post('/login', validation(userSchema), GeneralController.login);
router.get('/logout', Auth.authorization(userRoles.holder), GeneralController.logout);

router.use((req, res, next) => {
    const err = new APIError('Not Found', { status: 404 });
    next(err);
});

// eslint-disable-next-line no-unused-vars
router.use((err, req, res, next) => {
    log.error(err);
    const { message, status, payload } = err;
    res.status(status).json({
        status,
        message,
        payload,
    });
});

module.exports = router;
