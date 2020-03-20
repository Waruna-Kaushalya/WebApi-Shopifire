// var mongooseconn = require('mongoose');
// const db = process.env.MONGODB_URL;

// // mongooseconn.connect('mongodb+srv://Waruna:1qaz@cluster0-mdsj9.mongodb.net/shopifiredb?retryWrites=true&w=majority', function (error) 

// mongooseconn.connect(db, function (error) 

// {
//     if (error == null) {
//         console  .log("Connected");
//     }
//     else {
//         console.log(error);
//     }
// });

// module.exports = mongooseconn;




// const db = process.env.MONGODB_URL;

// const connectDB = async () => {
//   try {
//     await mongoose.connect(db, {
//       useUnifiedTopology: true,
//       useNewUrlParser: true
//     });
//     console.log("MongoDB is Connected...");
//   } catch (err) {
//     console.error(err.message);
//     process.exit(1);
//   }
// };