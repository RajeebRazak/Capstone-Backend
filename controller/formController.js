const form = require("../models/formschema");

exports.submitForm = async (req, res) => {
    const { dateofbooking, categoryofvehicle, bikemodel, year, typeofservice, customerComplaints } = req.body;
    
    try {
        const newForm = new form({
            dateofbooking,
            categoryofvehicle,
            bikemodel,
            year,
            typeofservice,
            customerComplaints,
        });
         await newForm.save();

         response.status(201).json({ message: "Form submitted successfully" });
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