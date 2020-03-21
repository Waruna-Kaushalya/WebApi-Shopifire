var mongooseconn = require('mongoose');

// newDB
const db = 'mongodb+srv://Waruna:1qaz@shopifirebackupcluster-nir4u.mongodb.net/shopifire?retryWrites=true&w=majority'

// oldDB
// const db = 'mongodb+srv://Waruna:1qaz@shopifirecluster-qkn98.mongodb.net/shopifire?retryWrites=true&w=majority'

mongooseconn.connect(process.env.MONGODB_URL || db, function (error) 

{
    if (error == null) {
        console.log("Connected");
    }
    else {
        console.log(error);
    }
});

module.exports = mongooseconn;