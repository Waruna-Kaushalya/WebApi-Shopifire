var mongooseconn = require('mongoose');
mongooseconn.connect('mongodb://localhost/shopifireDB', function (error) {
    if (error == null) {
        console.log("Connected");
    }
    else {
        console.log(error);
    }
});

module.exports = mongooseconn;