var MongoClient = require('mongodb').MongoClient;
const User = require('../models/user');
const express = require("express");
const router = express.Router();
const app = express();


const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require('../config/keys');

app.post("/", async (req, res) => {
  console.log('\u001b[1;35m cchange passwod');

  User.findOne({ _id: req.body.id }, function (err, doc) {
    //doc.cart=cart
    // doc.save();
    console.log('\u001b[1;35m vvbvbvbvb' + doc.email)
    bcrypt.compare(req.body.op, doc.password).then(isMatch => {
      if (isMatch) {
        console.log('\u001b[1;35m password is 1true')
        bcrypt.genSalt(10, (err, salt) => {

          bcrypt.hash(req.body.np, salt, (err, hash) => {
            if (err) throw err;
            doc.password = hash
            doc.save()
            //  console.log('\u001b[1;35m password is false')

            console.log('\u001b[1;35m nner saved')
            return res
              .status(200)
              .json()
          });
        });
      } else {
        console.log('\u001b[1;35m password is false')
        return res
          .status(275)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
    ;
  });

});
module.exports = app