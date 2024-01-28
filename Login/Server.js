const express = require('express');
const  bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
const path = require('path');
const collections = require('./config');

const app = express();

// Use EJS as view engine
app.set('view engine', 'ejs');


// Create a user model
const User = mongoose.model('User', {
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    phonenumber: String, 
});

// Middleware to parse JSON bodies
app.use(bodyParser.json());

//Enable  CORS
app.use(cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 
}));

// Register endpoint
app.post('/api/register',async (req, res) => {
    try {
       //Hash the password before saving it to the database
       const salt = await bcrypt.genSalt(10);
       const hashedPassword = await bcrypt.hash(req.body.password, salt);
     
      
      // create a new User
        const user = new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: hashedPassword,
            phonenumber: req.body.phonenumber,
        });

        // Save the user to the database
        await user.save();

        res.status(201).send({ message : 'Registration successful' });
     } catch (error) {
        console.log(error);
        res.status(500).send({ error : 'Internal server Error' });
     }
});

// Start the Server
const port = 5000; // Define your port
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});