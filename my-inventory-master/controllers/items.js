const Item = require('../models/item');
const User = require('../models/user');


exports.getUserItems = async (req, res, next) => {
  try {
    const myUser = await User.findById(req.params.id).populate('items');

    return res.status(200).json({
      success: true,
      count: myUser.items.length,
      data: myUser.items
    });
  } catch (err) {
      return res.status(500).json({
        success: false,
        error: 'Server Error'
  });
  }
}

exports.addUserItem = async (req, res, next) => {
  try {
    // Get user by Id
    const myUser = await User.findById(req.params.id);
    // create item
    const { name, quantity, price } = req.body;
    const myItem = await Item.create(req.body);

    // Assign user as item's user(owner)
    myItem.user = myUser;
    // Save item 
    await myItem.save();
    // Add Item to user's items array
    myUser.items.push(myItem);
    await myUser.save();

    return res.status(200).json({
      success: true,
      data: myItem
    });
  } catch (err) {
    if(err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      
      res.status(400).json({
        success: false,
        error: messages
      })
    } else {
      return res.status(500).json({
        success: false,
        error: 'Server Error'
      });
    }
  }
}

//@desc Get one item
//@route GET /api/v1/items/:id
//@access Public
exports.getItem = async (req, res, next) => {
  try {
      const myItem = await Item.findById(req.params.id);

      return res.status(200).json({
          success: true,
          data: myItem 
      });
  } catch (err) {
      return res.status(500).json({
          success: false,
          error: 'Server Error'
      });
  }
} 

//@desc Delete items
//@route DELETE /api/v1/items/:id
//@access Public
exports.deleteItems = async (req, res, next) => {
    try {
      const myItem = await Item.findById(req.params.id);

      if(!Item){
        return res.status(404).json({
          success: false,
          error: 'No item found'
        });
      }

      await myItem.remove();

      return res.status(200).json({
        success: true,
        data: {}
      });

    } catch (err) {
      return res.status(500).json({
        success: false,
        error: 'Server Error'
      });
    }
} 

//@desc Update item
//@route PUT /api/v1/items/:id
//@access Public
exports.updateItem = async (req, res, next) => {
  try {

      const { name, quantity, price } = req.body;
      
      const myItem = await Item.findByIdAndUpdate(req.params.id, req.body, {new: true});

      if(!item){
        return res.status(404).json({
          success: false,
          error: 'No item found'
        });
      }
  
      return res.status(201).json({
        success: true,
        data: myItem
      });
  } catch (err) {
      if(err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map(val => val.message);
        
        res.status(400).json({
          success: false,
          error: messages
        })
      } else {
        return res.status(500).json({
          success: false,
          error: 'Server Error'
        });
      }
  }
} 