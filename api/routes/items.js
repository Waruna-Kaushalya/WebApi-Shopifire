const router = require('express').Router();
let Item = require('../models/item.model');

router.route('/').get((req, res) => {
  Item.find()
    .then(items => res.json(items))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/add').post((req, res) => {
  console.log(" Admin create ddddddddddddddddddddddddddd")
  console.log(req.body.title)
  console.log(req.body.description )
  console.log(req.body.price )
  console.log(req.body.img )
    const title = req.body.title;
    const description = req.body.description;
    const price = Number(req.body.price);
    const img = req.body.img;
  
    const newItem = new Item({

      title,
      description,
      price,
      img,

    });
  
    newItem.save()
    .then(() => res.json('Item added!'))
    .catch(err => res.status(400).json('Error: ' + err));
 
 });

router.route('/:id').get((req, res) => {    // mongo auto id
  Item.findById(req.params.id)
    .then(item => res.json(item))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Item.findByIdAndDelete(req.params.id)
    .then(() => res.json('Item deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update').put((req, res) => {
  console.log("Edit Item Recieved00000000000")
  Item.findById(req.body.id)
    .then(item => {
      item.title = req.body.title;
      item.description = req.body.description;
      item.price = Number(req.body.price);
      item.img = req.body.img;

      item.save()
        .then(() => res.json('Item updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;