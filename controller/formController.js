const form = require("../models/formschema");
const { v4 : uuidv4 } = require('uuid');

exports.submitForm = async (req, res) => {
    const { dateofbooking, categoryofvehicle, bikemodel, year, typeofservice, customerComplaints, serviceId } = req.body;
    
    try {
        const serviceId = uuidv4(); // Generate unique ID for the form
        const newForm = new form({
            dateofbooking,
            categoryofvehicle,
            bikemodel,
            year,
            typeofservice,
            customerComplaints,
            serviceId
        });
         await newForm.save();

         res.status(201).json({ message: "Form submitted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message :"Server Error" });
    }

};

exports.getForms = async (req , res ) => {

     try {
        const forms = await form.find();
        res.json(forms)
     } catch (error) {
         console.error(error)
         res.status(500).json ({ message : " Server error"})
     }
};