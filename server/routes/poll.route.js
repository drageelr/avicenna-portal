// Dependancies
const router = require('express').Router();
const validate = require('express-validation').validate;
const verifyUser = require('../services/jwt').verfiyUser;
const pollController = require('../controllers/poll.controller');
const pollValidation = require('../validaitons/poll.validation');

// API 1.1 Create Poll:
router.post(
    '/create',
    validate(pollValidation.createPoll, { keyByField: true }),
    verifyUser,
    pollController.createPoll
);

// API 1.2 Delete Poll:
router.post(
    '/delete',
    validate(pollValidation.deletePoll, { keyByField: true }),
    verifyUser,
    pollController.deletePoll
);

// API 1.3 Get Poll:
router.post(
    '/get',
    validate(pollValidation.getPoll, { keyByField: true }),
    verifyUser,
    pollController.getPoll
);

// API 1.4 Stats Poll:
router.post(
    '/stats',
    validate(pollValidation.statsPoll, { keyByField: true }),
    verifyUser,
    pollController.statsPoll
);

// API 1.5 Submit Poll:
router.post(
    '/submit',
    validate(pollValidation.submitPoll, { keyByField: true }),
    verifyUser,
    pollController.submitPoll
);

module.exports = router;