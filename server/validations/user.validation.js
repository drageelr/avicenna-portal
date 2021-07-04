// Dependancies
var Joi = require('@hapi/joi');

// API 1.1:
exports.login = {
    body: Joi.object({
        phone: Joi.string().required(),
        password: Joi.string().min(8).max(30)
    })
};

// API 1.2:
exports.changePassword = {
    body: Joi.object({
        password: Joi.string().min(8).max(30)
    })
};

// API 1.3:
exports.addUser = {
    body: Joi.object({
        phone: Joi.string().required(),
        name: Joi.string().required(),
        skey: Joi.number().integer()
    })
};

// API 1.4:
exports.editUser = {
    body: Joi.object({
        phone: Joi.string().required(),
        newPhone: Joi.string(),
        name: Joi.string(),
        active: Joi.boolean(),
        admin: Joi.boolean(),
        skey: Joi.number().integer()
    })
};