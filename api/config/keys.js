var mongooseconn = require('mongoose');

// newDB MongoAtlas
const db = 'mongodb+srv://Waruna:1qaz@shopifirebackupcluster-nir4u.mongodb.net/shopifire?retryWrites=true&w=majority'

// oldDB MongoAtlas
// const db = 'mongodb+srv://Waruna:1qaz@shopifirecluster-qkn98.mongodb.net/shopifire?retryWrites=true&w=majority'

// localDB
// const db = 'mongodb://localhost/shopifireDB'


{
    if (error == null) {
        console.log("Connected");
    }
    else {
        console.log(error);
    }
});

module.exports = mongooseconn;