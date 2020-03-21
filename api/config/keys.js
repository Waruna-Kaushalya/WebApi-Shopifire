var mongooseconn = require('mongoose');

const db = 'mongodb+srv://Waruna:1qaz@shopifirecluster-qkn98.mongodb.net/shopifire?retryWrites=true&w=majority'

mongooseconn.connect('mongodb+srv://Waruna:1qaz@shopifirecluster-qkn98.mongodb.net/shopifire?retryWrites=true&w=majority', function (error) 

{
    if (error == null) {
        console.log("Connected");
    }
    else {
        console.log(error);
    }
});

module.exports = mongooseconn;