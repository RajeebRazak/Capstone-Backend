const express = require('express');
const router = express.Router();
const formController = require("../controller/formController");

// Route for form submission
router.post("/forms/submit", formController.submitForm);

// Route for get form submission
router.get("/forms", formController.getForms);


module.exports = router; 