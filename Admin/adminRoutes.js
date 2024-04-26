const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const adminController = require('../Admin/adminController');
const { adminAuthenticate } = require('../Admin/adminMiddleware');
require('dotenv').config();
const users = require("../models/userschema")


// Route for admin login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Check if the provided email and password match the admin's credentials
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
        // Generate a JWT token for admin using the secret key from environment variables
        const token = jwt.sign({ email, password }, process.env.SECRET_KEY, { expiresIn: '1h' });
        const user =  await   users.findOne({ email : email });
        console.log(user);
        res.status(200).json({ message: 'Login successful', token , role });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});
// Route for fetching form data from Admin panel
router.get('/admin/forms', adminAuthenticate , adminController.getFormDataForAdmin);

// Route for updating form status by Admin
router.put('/admin/forms/:serviceId', adminAuthenticate, adminController.updateFormStatus);


module.exports = router;
