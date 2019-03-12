const router = require('express').Router();
const users = require('express').Router();
const Auth = require('../middleware/auth');
const GeneralController = require('../controllers/general');
const UsersController = require('../controllers/users');

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
router.use('/state', GeneralController.state);
router.use('/login', GeneralController.login);

module.exports = router;
