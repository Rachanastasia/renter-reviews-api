require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const authRouter = require('./auth/auth-router');
const { NODE_ENV } = require('./config');
const passportSetup = require('./config/passport-setup');

const app = express();

app.use(morgan("common"));
app.use(express.json());
app.use(helmet());
app.use(cors());

app.use('/api/auth', authRouter);

app.get('/', (req, res) => {
    res.send('Hello boilerplate!')
})

app.use(function errorHandler(error, req, res, next) {
    let response
    if (NODE_ENV === 'production') {
        response = { error: { message: 'server error' } }
    } else {
        console.log(error)
        response = { message: error.message, error }
    }
    res.status(500).json(response)
})

module.exports = app;