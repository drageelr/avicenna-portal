// Dependancies
const generator = require('generate-password');
const jwt = require('../services/jwt');
const whatsapp = require('../services/whatsapp');
const customError = require('../errors/errors');
const User = require('../models/user.model');

function genPass() {
    return generator.generate({
        length: 10,
        numbers: true,
        lowercase: true,
        uppercase: true,
        strict: true
    });
}

exports.login = async (req, res, next) => {
    try {
        let params = req.body;

        let reqUser = await User.findOne({phone: params.phone, password: params.password, active: true});
        if (!reqUser) throw new customError.AuthenticationError("invalid phone or password or account is not active");

        let token = jwt.signUser(reqUser._id, '24h');

        res.json({
            statusCode: 200,
            message: "Login Successful!",
            name: reqUser.name,
            token: token
        });
    } catch(e) {
        next(e);
    }
}

exports.changePassword = async (req, res, next) => {
    try {
        let params = req.body;

        await User.findOneAndUpdate({_id: params._id}, {password: params.password});

        res.json({
            statusCode: 200,
            message: "Password Changed Successfully!"
        });
    } catch(e) {
        next(e);
    }
}

exports.addUser = async (req, res, next) => {
    try {
        let params = req.body;

        if (!(await User.findOne({_id: params._id, active: true, admin: true}))) throw new customError.ForbiddenAccessError("not admin or not active");

        if (await User.findOne({phone: params.phone})) throw new customError.DuplicateResourceError("user with phone already exists");

        let password = genPass();

        let newUser = new User({
            phone: params.phone,
            password: password,
            name: params.name,
            active: true,
            admin: false,
            skey: params.skey
        });

        await newUser.save();

        // Send Whatsapp Message
        let message = `[*Avicenna App*]
        
        Hello ${params.name},
        Your account at Avicenna App has been created. The following are your credentials:
        Phone: *${params.phone}*
        Password: *${password}*`;

        await whatsapp.sendMessage(params.phone, params.skey, message);

        res.json({
            statusCode: 200,
            message: "Added User Successfully!"
        })
    } catch(e) {
        next(e);
    }
}

exports.editUser = async (req, res, next) => {
    try {
        let params = req.body;

        let reqUser = await User.findOne({phone: params.phone});

        if (!reqUser) throw new customError.NotFoundError("user not found");

        const keys = ['name', 'active', 'admin', 'skey'];
        const updateKeys = {};
        for (let i = 0; i < keys.length; i++) {
            if (params[keys[i]] !== undefined) updateKeys[keys[i]] = params[keys[i]];
        }

        if (params.newPhone) {
            if (await User.findOne({phone: params.newPhone})) throw new customError.DuplicateResourceError("user with phone already exists");
            updateKeys.phone = params.newPhone;
        }

        await reqUser.update(updateKeys);

        res.json({
            statusCode: 200,
            message: "Edited User Successfully!"
        });
    } catch(e) {
        next(e);
    }
}

exports.getUsers = async (req, res, next) => {
    try {
        let reqUsers = await User.find({}, 'phone name active admin');
        
        let users = reqUsers.map(obj => {
            return {
                phone: obj.phone,
                name: obj.name,
                active: obj.active,
                admin: obj.admin
            }
        });

        res.json({
            statusCode: 200,
            message: "Fetched User(s) Successfully!",
            users: users
        })
    } catch(e) {
        next(e);
    }
}

exports.defaultUser = async () => {
    let user = await User.findOne({});

    if(!user) {
        user = new User({
            phone: process.env.MY_PHONE,
            password: process.env.MY_PASSWORD,
            name: process.env.MY_NAME,
            active: true,
            admin: true,
            skey: process.env.MY_SKEY
        })

        await user.save();

        console.log("Default User Created!");
    } else {
        console.log("No need for default user!");
    }
}