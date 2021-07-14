// Dependancies
const router = require('express').Router();
const validate = require('express-validation').validate;
const verifyUser = require('../services/jwt').verfiyUser;
const userController = require('../controllers/user.controller');
const userValidation = require('../validaitons/user.validation');

// API 1.1 Login:
router.post(
    '/login',
    validate(userValidation.login, { keyByField: true }),
    userController.login
);

// API 1.2 Change Password:
router.post(
    '/change-password',
    validate(userValidation.changePassword, { keyByField: true }),
    verifyUser,
    userController.changePassword
);

// API 1.3 Add User:
router.post(
    '/register',
    validate(userValidation.register, { keyByField: true }),
    userController.register
);

// API 1.4 Edit User:
router.post(
    '/edit',
    validate(userValidation.editUser, { keyByField: true }),
    verifyUser,
    userController.editUser
);

// API 1.5 Get Users:
router.post(
    '/get',
    verifyUser,
    userController.getUsers
);

// API 1.6 Verify User:
router.post(
    '/verify',
    validate(userValidation.verify, { keyByField: true }),
    userController.verify
);

module.exports = router;