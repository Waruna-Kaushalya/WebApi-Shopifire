'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const userModel = require('../api/models/user');
const validate = require('../api/middleware/validator/register')
const loginValidate = require('../api/middleware/validator/login')
const EditUserDetailsValidate = require('../api/middleware/validator/EditUserDetails')
const userRoute = require('../api/routes/register')
const editProfileRoute = require('../api/routes/editUserDetails')
const morgan = require('morgan')
const loginRoute = require('../api/routes/login')
const adminloginRoute = require('../api/routes/adminLog')
const passwordRoute = require('../api/routes/editpassword')
const EditPasswordValidate = require('../api/middleware/validator/EditPassword')
const itemModel=require('../api/models/item.model')


require('dotenv').config();

app.use(morgan('tiny'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
const itemsRouter = require('./routes/items');
app.use('/items', itemsRouter);


const mongoose = require('./config/keys');
var Schema = mongoose.Schema;

var productDataSchema = new Schema({

  id: Number,
  name: String,
  available_quantity: Number,
  price: Number,
  image: String,
  description: String
}, { collection: 'items', versionKey: false });

var productDataSchema = mongoose.model('productDataSchema', productDataSchema);

var arrayB = [];

app.get('/api/products', (req, res) => {

  var arrayA = [];

  productDataSchema.find()
    .then(function (doc) {
      if (doc) {
        for (var i = 0; i < doc.length; i++) {
          arrayA.push(doc[i])
        }
        arrayB = arrayA
        return res.json(arrayA);
      }
      else {
        console.log("detabases error");
      }
    });
});

app.post('/api/products', (req, res) => {
  console.log('\u001b[1;35m api/products')
  let products = [], id = null;
  let cart = JSON.parse(req.body.cart);
  if (!cart) return res.json(products)
  for (var i = 0; i < arrayB.length; i++) {
    id = arrayB[i]._id.toString();
    if (cart.hasOwnProperty(id)) {

      arrayB[i].qty = cart[id]
      products.push(arrayB[i]);
    }
  }

  return res.json(products);
});

app.post('/api/storecart', (req, res) => {
  console.log('\u001b[1;35m mmmmmmmmmmmmmmmmmmmmm')
  let cart = req.body.cart;
  let userId=req.body.id
  console.log('\u001b[1;35m'+cart)

  var id1 = mongoose.Types.ObjectId(userId);
  var id11="ObjectId(5e6e4ad9a119c22d6067f2ba)"
  userModel.findOne({ _id: id1 }, function (err, doc){
    
    doc.cart=cart
     doc.save();
     return res.status(200).json("");
   });
});

app.get('/api/customers', (req, res) => {
  console.log("customers get 1000000000000000000000000")

  userModel.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

app.delete('/api/customers/:id', (req, res) => {
  console.log("customers delete 000000000000000000000000")

  userModel.findByIdAndDelete(req.params.id)
    .then(() => res.json('Item deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

app.get('/api/test', (req, res) => {
  var GoodConnection=[];
  var BadConnection =[];
  var arrayA = [];
  console.log("search functon recieved")
 var a=req.param('Searchvalue')
 
  let searchterm=req.param('Searchvalue').trim()
  itemModel.find()
      .then(function (doc) {
          if (doc)
          {
              for (var i=0;i<doc.length;i++)
              {
                var  itemobj=doc[i]
              // console.log(itemobj.title)
              if ((searchterm == null) || (searchterm === "")) {
                if((itemobj.description.toLowerCase().includes(req.param('Location').toLowerCase()))&&(itemobj.price<req.param('Maxvalue'))&&(itemobj.price>req.param('Minvalue')))//&&itemobj.price>10//&&(itemobj.price<parent(req.param('Maxvalue')) )&&(itemobj.price<parent(req.param('Minvalue')) )
                {
                  if (req.param('Packaging')=="Unpackaged")
                  {
                    if(itemobj.description.toLowerCase().includes("Unpackaged".toLowerCase()))
                    {
                      arrayA.push(doc[i])

                    }
                    

                  }
                  else if(req.param('Packaging')=="a")
                  {
                    arrayA.push(doc[i])

                  }
                  else
                  {
                    if(!itemobj.description.toLowerCase().includes("Unpackaged".toLowerCase()))
                    {
                      arrayA.push(doc[i])

                    }

                  }
                  
                 
                 
                  console.log('\u001b[1;35m'+itemobj.title)}
               
              }
              else
              {
                 if(  (itemobj.title.toLowerCase().includes(searchterm.toLowerCase())) && (itemobj.description.toLowerCase().includes(req.param('Location').toLowerCase()))&&(itemobj.price<req.param('Maxvalue'))&&(itemobj.price>req.param('Minvalue')))//&&itemobj.price>10//&&(itemobj.price<parent(req.param('Maxvalue')) )&&(itemobj.price<parent(req.param('Minvalue')) )
                {
                  if (req.param('Packaging')=="Unpackaged")
                  {
                    if(itemobj.description.toLowerCase().includes("Unpackaged".toLowerCase()))
                    {
                      arrayA.push(doc[i])

                    }
                    

                  }
                  else if(req.param('Packaging')=="a")
                  {
                    arrayA.push(doc[i])

                  }
                  else
                  {
                    if(!itemobj.description.toLowerCase().includes("Unpackaged".toLowerCase()))
                    {
                      arrayA.push(doc[i])

                    }

                  }
                  
                 
                 
                  console.log('\u001b[1;35m'+itemobj.title)}
              }


              }
              
             
              // console.log("ssssssssssssssssssss")
              return res.json(arrayA);

          }
          else
          {
              console.log("detabases error");
          }

      });
  
  console.log("------------------------------------------------------search recieved")
});



app.use('/api/auth/login', loginValidate, loginRoute);
app.use('/api/auth/register', validate, userRoute);
app.use('/api/auth/adminLog', loginValidate, adminloginRoute);
app.use('/api/EditUserDetails', EditUserDetailsValidate, editProfileRoute);
app.use('/api/EditPassword', EditPasswordValidate, passwordRoute);

const PORT = process.env.PORT || 5000;

// app.listen(PORT);
// console.log('api runnging on port ' + PORT + ': ');


app.listen(PORT, '0.0.0.0', function(err) {
  console.log("===========================")
  console.log('api runnging on port ' + PORT + ': ');
});