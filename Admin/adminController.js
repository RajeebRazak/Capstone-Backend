const Form = require("../models/formschema");

exports.getFormDataForAdmin = async (req, res) => {
    try {
        const formData = await Form.find();
        res.json(formData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message : "Server Error"});

    }
};