const mongoose = require('mongoose');
const connectDB =  async () => {
    await mongoose.connect("mongodb+srv://rajeebrazak786:UiSCs6437ThnAZE@capstoneproject.2zecabi.mongodb.net/")
   console.log("mongodb connected ")
};
module.exports = connectDB;
