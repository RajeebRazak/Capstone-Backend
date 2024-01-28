const mongoose = require('mongoose');
const connect = mongoose.connect("mongodb://localhost:27017/Service/Customerdata");

//check database connection or not 
connect.then(() => {
    console.log("Database connected Successfully");
})
.catch(() => {
    console.log("Database connection failed");
});

//Create a Register Schema 
const RegisterSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: { 
        type: String, 
        required: true

    },
    email: {
        type: String,
        required: true
    },
    phonenumber: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// Collection Part 
const collection = new mongoose.model("Customerdata", RegisterSchema);

module.exports = collection;