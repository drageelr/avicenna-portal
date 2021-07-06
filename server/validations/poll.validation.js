// Dependancies
var Joi = require('@hapi/joi');

// API 1.1:
exports.createPoll = {
    body: Joi.object({
        question: Joi.string().min(1).max(500),
        options: Joi.array().items(Joi.string().min(1).max(250)).required()
    })
};

// API 1.2:
exports.deletePoll = {
    body: Joi.object({
        pollId: Joi.string().required()
    })
};

// API 1.3:
exports.getPoll = {
    body: Joi.object({
        pollId: Joi.string().required()
    })
};

// API 1.4:
exports.statsPoll = {
    body: Joi.object({
        pollId: Joi.string().required()
    })
};

// API 1.5:
exports.submitPoll = {
    body: Joi.object({
        pollId: Joi.string().required(),
        optionId: Joi.number().integer().required()
    })
}