const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
    dateofbooking: String,
    categoryofvehicle: String,
    bikemodel: String,
    year: String,
    typeofservice: String,
    customerComplaints : [String],
    status : { type : String, enum: ['pending', 'approved'], default : "pending" }, // Using enum type
    serviceId: String 
});

module.exports = mongoose.model("form" , formSchema);