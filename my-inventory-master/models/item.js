const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = Schema({
    name: {
      type: String,
      trim: true,
      required: [true, 'Please add a name']
    },
    quantity: {
      type: Number,
      required: [true, 'Please add quantity']
    },
    price: {
      type: Number, 
      required: [true, 'Please add price']
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }

});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;

