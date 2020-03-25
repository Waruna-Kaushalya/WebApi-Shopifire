var MongoClient = require('mongodb').MongoClient;

const express = require("express");
const router = express.Router();
const app = express();
const userModel = require('../models/user');
const User = require('../models/user')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

app.post("/", async (req, res) => { 

  console.log("userroute reques recieved")
  console.log("registern----------------")
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(274).json("Email already exists");
    } else {
      console.log("registration end")
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
          if (err) throw err;
          var cartt = {}
          var cart1 = JSON.stringify(cartt)
          let user = new userModel({ name: req.body.name, email: req.body.email, password: hash, cart: cart1 })
          user.save()
            .then(user => res.status(200).json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});
module.exports = app