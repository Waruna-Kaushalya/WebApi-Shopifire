var MongoClient = require('mongodb').MongoClient;

const express = require("express");
const router = express.Router();
const app = express();
const userModel = require('../models/user');
const User = require('../models/user')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require('../config/keys');

app.post("/", async (req, res) => {

    console.log("userroute reques recieved")
    console.log("registern----------------")
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            if (user._id == req.body.id) {
                console.log('\u001b[1;35m successss user_id')

                var id1 = mongoose.Types.ObjectId(req.body.id);

                userModel.findOne({ _id: id1 }, function (err, doc) {
                    doc.name = req.body.name;
                    doc.email = req.body.email;

                    doc.save();
                    var userobj = { _id: req.body.id, name: req.body.name, email: req.body.email, password: doc.password, cart: doc.cart }
                    return res.status(200).json(userobj);
                });

            }
            else {
                console.log('\u001b[1;35m faill user_id')
                return res.status(274).json("Email already exists");
            }
        }
        else {

            var id1 = mongoose.Types.ObjectId(req.body.id);

            userModel.findOne({ _id: id1 }, function (err, doc) {
                doc.name = req.body.name;
                doc.email = req.body.email;

                doc.save();

                return res.status(200).json(doc);
            });
        }
    });
});
module.exports = app