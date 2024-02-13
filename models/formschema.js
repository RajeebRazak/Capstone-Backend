const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
    dateofbooking: String,
    categoryofvehicle: String,
    bikemodel: String,
    year: String,
    typeofservice: String,
    customerComplaints : [String],
    status : { type : String, default : "pending" }
});

module.exports = mongoose.model("form" , formSchema);