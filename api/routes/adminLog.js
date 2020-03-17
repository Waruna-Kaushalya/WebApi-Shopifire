var MongoClient = require('mongodb').MongoClient;

const express = require("express");
const router = express.Router();
const app = express();
const userModel = require('../models/admin');
const User = require('../models/admin')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
app.post("/", async (req, res) => {

  console.log(req.body.email)
  console.log(req.body.password)
  const password = req.body.password

  console.log("hashn amin login route reques recieved")

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      console.log(user.password)
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          return res.status(200).json(user)

        } else {
          return res
            .status(275)
            .json({ passwordincorrect: "Password incorrect" });
        }
      });

    } else {
      return res.status(274).json("Email already exists");

    }
  });

});
module.exports = app