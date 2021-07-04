const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('./services/mongoose');

const { errorHandler } = require('./errors/errorhandler');
const { defaultUser } = require('./controllers/user.controller');

const userRouter = require('./routes/user.route');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/user', userRouter);

app.use(errorHandler);

mongoose.connect();

defaultUser();

module.exports = app;
