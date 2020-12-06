const express  = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { deleteItems, updateItem, getItem, getUserItems, addUserItem } = require('../controllers/items');

//Item model
const Item = require('../models/item');

router.route('/:id')
  .delete(deleteItems)
  .put(updateItem);

router.route('/item/:id')
  .get(getItem);

router.route('/:id')
   .get(getUserItems)
   .post(addUserItem);

module.exports = router;