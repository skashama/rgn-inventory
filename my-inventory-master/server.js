const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const path = require('path');

// Database Config
const connectDB = require('./config/db');

dotenv.config({ path: './config/config.env' });

connectDB();

const items = require('./routes/items');
const users = require('./routes/users');

// Create express server
const app = express();

app.use(express.json());

//Routes
app.use('/api/v1/items', items);
app.use('/users', users);

// Server Static if in production
if(process.env.NODE_ENV === 'production') {
    //Set static folder
    //All JavaScript and css files will be read and served from this folder
    app.use(express.static('client/build'));

    //index.html for all page routes
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}


const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.blue.bold));