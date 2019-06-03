const router = require('express').Router();
const users = require('express').Router();
// const mbReferences = require('express').Router();
const Auth = require('../middleware/auth');
const validation = require('../middleware/validation');
const GeneralController = require('../controllers/general');
const UsersController = require('../controllers/users');
// const MbReferences = require('../controllers/mbReferences');
const APIError = require('../services/error');
const { userRoles, userSchema, userCreateSchema } = require('../models/user');

/**
 * users ...
 */
users.get('/', Auth.authorization(userRoles.admin), UsersController.getAll);
users.get('/:userId', Auth.authorization(userRoles.admin), UsersController.get);
users.post('/', Auth.authorization(userRoles.root), validation(userCreateSchema), UsersController.create);
users.patch('/:userId', Auth.authorization(userRoles.admin), validation(userSchema), UsersController.update);
users.get('/titles', Auth.authorization(userRoles.holder), UsersController.getTitles);

/**
 * mbReferences ...
 */
// mbReferences.post('', MbReferences.create);

/**
 * router ...
 */
router.use('/users', users);
router.get('/titles', Auth.authorization(userRoles.holder), UsersController.getTitles);
router.get('/roles', Auth.authorization(userRoles.holder), UsersController.getRoles);
router.get('/countries', Auth.authorization(userRoles.holder), UsersController.getCountries);
// router.use('/mbreferences', mbReferences);
router.get('/state', Auth.authorization(userRoles.admin), GeneralController.state);
router.post('/login', validation(userSchema), GeneralController.login);
router.get('/logout', Auth.authorization(userRoles.admin), GeneralController.logout);

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
