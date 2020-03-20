var mongooseconn = require('mongoose');


// mongooseconn.connect('mongodb+srv://Waruna:1qaz@cluster0-mdsj9.mongodb.net/shopifiredb?retryWrites=true&w=majority', function (error) 

mongooseconn.connect(process.env.MONGODB_URL, function (error) 


{
    if (error == null) {
        console.log("Connected");
    }
    else {
        console.log(error);
    }
});

module.exports = mongooseconn;