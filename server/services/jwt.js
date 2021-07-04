// Dependancies
const jwt = require('jsonwebtoken');
const customError = require('../errors/errors');
const User = require('../models/user.model');

exports.signUser = (id, expiry) => {
    return jwt.sign({_id: id}, process.env.SECRET_KEY, {expiresIn: expiry});
}

function decodeToken(token) {
    try {
        return jwt.verify(token, process.env.SECRET_KEY);
    } catch(e) {
        return {err: e};
    }
}

exports.verfiyUser = async (req, res, next) => {
    try {
        let token = req.get("Authorization");
        if (token) {
            token = token.substring(7);
        } else {
            throw new customError.ForbiddenAccessError("no token given");
        }

        let decodedObj = decodeToken(token);
        if(decodedObj.err) throw new customError.ForbiddenAccessError("invalid token");

        let reqUser = await User.findById(decodedObj._id);
        if (reqUser) {
            req.body._id = decodedObj._id
        } else {
            throw new customError.ForbiddenAccessError("invalid token");
        }

        next();
    } catch(e) {
        next(e);
    }
}