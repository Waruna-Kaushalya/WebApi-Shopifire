'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const userModel = require('../api/models/user');
const validate = require('../api/middleware/validator/register')
const loginValidate = require('../api/middleware/validator/login')
const userRoute = require('../api/routes/user')
const morgan = require('morgan')
const loginRoute = require('../api/routes/login')
const adminloginRoute = require('../api/routes/adminLog')

require('dotenv').config();

app.use(morgan('tiny'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
const itemsRouter = require('./routes/items');
app.use('/items', itemsRouter);


app.use('/api/auth/login', loginValidate, loginRoute);
app.use('/api/auth/register', validate, userRoute);
app.use('/api/auth/adminLog', loginValidate, adminloginRoute);

const PORT = 5000;

app.listen(PORT);
console.log('api runnging on port ' + PORT + ': ');