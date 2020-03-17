const router = require('express').Router();
let Item = require('../models/item.model');

router.route('/').get((req, res) => {
  Item.find()
    .then(items => res.json(items))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {


  const title = req.body.title;
  const description = req.body.description;
  const price = Number(req.body.price);
  const img = req.body.img;
  const id = req.body.id;

  const newItem = new Item({

    title,
    description,
    price,
    img,
    id,

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

router.route('/update/:id').post((req, res) => {
  console.log(req.params.id)
  Item.findById(req.params.id)
    .then(item => {
      // item.title = req.body.title;
      item.id = req.body.id;
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