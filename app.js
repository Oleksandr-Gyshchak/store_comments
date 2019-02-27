const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fileUpload = require('express-fileupload');

require('./configs/mongo');

const passport = require('passport');
require('./configs/passport.config')(passport);

const indexRouter = require('./routes/index');
const profileRouter = require('./routes/profile');
const loginRouter = require('./routes/login');
const apiRouter = require('./routes/api');
const signUpRouter = require('./routes/signup');
const signUpLoginApiRouter = require('./routes/signUpLoginApi');

const app = express();
app.use(passport.initialize());

app.set(path.join(__dirname, 'views'));
app.set("view engine", "hbs");

app.use(fileUpload());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/profile', profileRouter);
app.use('/login', loginRouter);
app.use('/signup', signUpRouter);

app.use('/login-api', signUpLoginApiRouter);
app.use('/api', apiRouter);


app.use(function (err, req, res, next) {
    console.error(err.message);
    res.status(err.status || 500).json({
        error: err.message
    });
});

module.exports = app;