const Form = require("../models/formschema");

exports.getFormDataForAdmin = async (req, res) => {
  try {
    const formData = await Form.find();
    res.json(formData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Function to update form status
exports.updateFormStatus = async (req, res) => {
  try {
    const { serviceId } = req.params;

    const form = await Form.findOne({ serviceId });

    if (!form) {
      return res.status(404).json({ error: "Form not found" });
    }

    // Ensure that the provided status is either 'pending' or 'approved'
    if (!['pending', 'approved'].includes(req.body.status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    form.status = req.body.status;
    await form.save();

    res.status(200).json({ message: "Form status updated successfully", form });
  } catch (error) {
    console.error("Error updating form status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};