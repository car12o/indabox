const router = require('express').Router();
const users = require('express').Router();
const Auth = require('../middleware/auth');
const GeneralController = require('../controllers/general');
const UsersController = require('../controllers/users');
const APIError = require('../services/error');

/**
 * users ...
 */
users.get('', UsersController.get);
users.get('/:userId', UsersController.get);
users.post('', UsersController.store);
users.patch('/:userId', UsersController.update);
// users.delete('/:userId', UsersController.delete);

/**
 * router ...
 */
router.use('/users', Auth.authorization, users);
router.get('/state', GeneralController.state);
router.post('/login', GeneralController.login);
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
