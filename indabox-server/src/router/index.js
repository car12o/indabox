const router = require('express').Router();
const users = require('express').Router();
const mbReferences = require('express').Router();
const Auth = require('../middleware/auth');
const GeneralController = require('../controllers/general');
const UsersController = require('../controllers/users');
const MbReferences = require('../controllers/mbReferences');
const APIError = require('../services/error');
const { userSchema } = require('../models/user');
const validation = require('../middleware/validation');

/**
 * users ...
 */
users.get('', UsersController.getAll);
users.get('/:userId', UsersController.get);
users.post('', validation(userSchema), UsersController.create);
users.patch('/:userId', validation(userSchema), UsersController.update);
// users.delete('/:userId', UsersController.delete);

/**
 * mbReferences ...
 */
mbReferences.post('', MbReferences.create);

/**
 * router ...
 */
router.use('/users', Auth.authorization, users);
router.use('/mbreferences', mbReferences);
router.get('/state', GeneralController.state);
router.post('/login', validation(userSchema), GeneralController.login);
router.get('/logout', GeneralController.logout);

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
