const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');

// Route for registering a user
router.post('/signup', authController.Signup);

// Route for logging in a user
router.post('/login', authController.login);

module.exports = router;
