var mongooseconn = require('mongoose');

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