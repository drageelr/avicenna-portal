// Dependancies
const customError = require('../errors/errors');
const User = require('../models/user.model');
const Poll = require('../models/poll.model');
const PollAns = require('../models/pollAns.model');

exports.createPoll = async (req, res, next) => {
    try {
        let params = req.body;

        let reqUser = await User.findById(params._id, 'active admin phone');
        if (!reqUser.active || !reqUser.admin) throw new customError.ForbiddenAccessError("account not admin or active");

        let newPoll = new Poll({
            question: params.question,
            userPhone: reqUser.phone,
            active: true,
            options: params.options.map(val => {
                return {content: val};
            })
        })

        await newPoll.save();

        res.json({
            statusCode: 200,
            message: "Poll Created Successfully!",
            pollId: newPoll._id
        });
    } catch(e) {
        next(e);
    }
}

exports.deletePoll = async (req, res, next) => {
    try {
        let params = req.body;

        let reqPoll = await Poll.findById(params.pollId);
        if (!reqPoll) throw new customError.NotFoundError("poll not found");

        await PollAns.deleteMany({pollId: params.pollId});

        await Poll.deleteOne({_id: params.pollId});

        res.json({
            statusCode: 200,
            message: "Poll Deleted Successfully!",
        });
    } catch(e) {
        next(e);
    }
}

exports.getPoll = async (req, res, next) => {
    try {
        let params = req.body;

        let reqPoll = Poll.findById(params.pollId);
        let reqUser = User.findById(params._id, 'admin phone active');

        await Promise.all([reqPoll, reqUser]);

        if (!reqPoll) throw new customError.NotFoundError("poll not found");

        if (!reqUser.active) throw new customError.ForbiddenAccessError("account not active");

        if (!reqUser.admin && !reqPoll.active) throw new customError.ForbiddenAccessError("poll is not active");

        let pollUser = User.findOne({phone: reqPoll.creatorPhone}, 'name');
        let pollAnswers = PollAns.findMany({pollId: reqPoll._id}, 'optionId');
        let reqPollAns = PollAns.findOne({pollId: reqPoll._id, userPhone: reqUser.phone}, 'optionId');

        await Promise.all([pollUser, pollAnswers, reqPollAns]);

        let count = new Array(reqPoll.options.length).fill(0);

        for (let i = 0; i < reqPoll.options.length; i++) {
            count[reqPoll.options[i]] += 1;
        }

        res.json({
            statusCode: 200,
            message: "Got Poll Successfully!",
            poll: {
                pollId: reqPoll._id,
                userName: pollUser.name,
                question: reqPoll.question,
                options: reqPoll.options.map(obj => obj.content),
                count: count,
                active: reqPoll.active,
                selected: (() => {
                    if (reqPollAns) return reqPollAns.optionId;
                    else return -1;
                })()
            }
        });
    } catch(e) {
        next(e);
    }
}

exports.statsPoll = async (req, res, next) => {
    try {
        let params = req.body;

        let reqPoll = Poll.findById(params.pollId);
        let reqUser = User.findById(params._id, 'admin active');

        await Promise.all([reqPoll, reqUser]);

        if (!reqPoll) throw new customError.NotFoundError("poll not found");

        if (!reqUser.active || !reqUser.admin) throw new customError.ForbiddenAccessError("account not active or admin");

        let pollAnswers = await PollAns.findMany({pollId: reqPoll._id}, 'optionId userPhone createdAt');

        let pollUsers = await Users.findMany({phone: {$in: pollAnswers.map(obj => obj.userPhone)}});

        let stats = [];

        for (let i = 0; i < pollAnswers.length; i++) {
            stats.push({name: pollUsers[i], option: reqPoll.options[pollAnswers[i].optionId], timestamp: pollAnswers[i].createdAt});
        }

        res.json({
            statusCode: 200,
            message: "Poll Created Successfully!",
            stats: stats
        });
    } catch(e) {
        next(e);
    }
}

exports.submitPoll = async (req, res, next) => {
    try {
        let params = req.body;

        let reqPoll = Poll.findById(params.pollId);
        let reqUser = User.findById(params._id, 'phone active');

        await Promise.all([reqPoll, reqUser]);

        if (!reqPoll) throw new customError.NotFoundError("poll not found");

        if (!reqUser.active) throw new customError.ForbiddenAccessError("account not active");

        if (!reqPoll.active) throw new customError.ForbiddenAccessError("poll is not active");

        if (params.optionId >= reqPoll.options.length || params.optionId < 0) throw new customError.ForbiddenAccessError("invalid option");

        await PollAns.deleteOne({userPhone: reqUser.phone});

        let newPollAns = new PollAns({
            pollId: reqPoll._id,
            userPhone: params._id,
            optionId: params.optionId
        });

        await newPollAns.save();

        res.json({
            statusCode: 200,
            message: "Poll Ans Submitted Successfully!",
        });
    } catch(e) {
        next(e);
    }
}