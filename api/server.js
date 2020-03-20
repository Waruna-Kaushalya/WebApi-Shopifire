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


const mongoose = require('./config/keys');
var Schema = mongoose.Schema;

var fenceNodeConnection = new Schema({

  id: Number,
  name: String,
  available_quantity: Number,
  price: Number,
  image: String,
  description: String

}, { collection: 'items', versionKey: false });

var fenceNodeConnection = mongoose.model('fenceNodeConnection', fenceNodeConnection);

var arrayB = [];

app.get('/api/products', (req, res) => {

  var arrayA = [];

  fenceNodeConnection.find()
    .then(function (doc) {
      if (doc) {
        for (var i = 0; i < doc.length; i++) {
          arrayA.push(doc[i])
        }
        arrayB = arrayA
        return res.json(arrayA);
      }
      else {
        console.log("detabases error");
      }

    });

});

app.post('/api/products', (req, res) => {

  let products = [], id = null;
  let cart = JSON.parse(req.body.cart);
  if (!cart) return res.json(products)
  for (var i = 0; i < arrayB.length; i++) {
    id = arrayB[i].id.toString();
    if (cart.hasOwnProperty(id)) {

      arrayB[i].qty = cart[id]
      products.push(arrayB[i]);
    }
  }

  return res.json(products);
});

app.get('/api/customers', (req, res) => {
  console.log("customers get 1000000000000000000000000")

  userModel.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

app.delete('/api/customers/:id', (req, res) => {
  console.log("customers delete 000000000000000000000000")

  userModel.findByIdAndDelete(req.params.id)
    .then(() => res.json('Item deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});



app.use('/api/auth/login', loginValidate, loginRoute);
app.use('/api/auth/register', validate, userRoute);
app.use('/api/auth/adminLog', loginValidate, adminloginRoute);

const PORT = 5000;

app.listen(PORT);
console.log('api runnging on port ' + PORT + ': ');