const router = require('express').Router();
const users = require('express').Router();
const UsersController = require('../controllers/users');

/**
 * users ...
 */
users.get('', UsersController.get);
users.get('/:id', UsersController.get);
users.post('', UsersController.store);

/**
 * router ...
 */
router.use('/users', users);

module.exports = router;
