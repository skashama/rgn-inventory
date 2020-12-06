const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = Schema({
    username: {
      type: String,
      trim: true,
      required: [true, 'Please enter username']
    },
    email: {
      type: String,
      required: [true, 'Please enter email'],
      unique: true
    },
    password: {
      type: String,
      required: [true, 'Please enter password']
    },
    currency: {
      type: String
    },
    register_date: {
      type: Date,
      default: Date.now
    },
    items : [{
      type: Schema.Types.ObjectId,
      ref: 'Item'
    }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
