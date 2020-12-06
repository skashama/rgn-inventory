const express  = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
const auth = require('../middleware/auth');

dotenv.config();
const myJwt = process.env.JwtSecret;


// User Model
const User = require('../models/user');

// @route POST /users/login
// @desc Post user data
// @access Private
//Login Page
router.post('/login', (req, res) => {
  const { email, password } = req.body;

    // Simple validation
    if (!email || !password) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }

  // Check for existing user
  User.findOne({ email })
     .then(user => {
         if(!user) return res.status(400).json({ msg: 'User does not exist' });

         // Validate password
         bcrypt.compare(password, user.password)
            .then(isMatch => {
              if(!isMatch) return res.status(400).json({ msg: 'Invalid password'});

              jwt.sign(
                { id: user.id },
                myJwt,
                (err, token) => {
                  if(err) throw err;
                    res.json({
                      token,
                      user: {
                        id: user._id,
                        username: user.username,
                        email: user.email,
                        items: user.items,
                        currency: user.currency
                      }
                  });
                }
              )
            })

     });
});

// @route POST /users/register
// @desc Post user data
// @access Private
//Register Page
router.post('/register', (req, res) => {
    const { username, email, password, currency } = req.body;
    
    // Simple validation
      if (!username || !email || !password || !currency) {
        return res.status(400).json({ msg: 'Please enter all fields' });
      }

    // Check for existing user
    User.findOne({ email })
       .then(user => {
           if(user) return res.status(400).json({ msg: 'User already exists' });

           const newUser = new User({
            username,
            email,
            password,
            currency
           });


           // Create Salt & hash
           bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(newUser.password, salt, (err, hash) => {
                if(err) throw err;
                newUser.password = hash;
                newUser.save()
                .then(user => {

                    jwt.sign(
                      { id: user.id },
                      myJwt,
                      (err, token) => {
                        if(err) throw err;
                          res.json({
                            token,
                            user: {
                              id: user._id,
                              username: user.username,
                              email: user.email
                            }
                        });
                      }
                    )
                })
              })
           })
       });
});

// @route GET /user
// @desc Get user data
// @access Private
router.get('/user', auth, (req, res) => {
  User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user));
});

module.exports = router;