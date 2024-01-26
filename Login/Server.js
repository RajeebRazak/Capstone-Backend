const express = require('express');
const  bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB (Make sure you have MongoDB installed and running)
mongoose.connect('mongodb://localhost:27017/your_database_name', { useNewUrlParser: true, useUnifiedTopology: true });

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
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});