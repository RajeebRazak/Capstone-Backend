const express = require('express');
require("dotenv").config();
const cors = require("cors");
const connectDB = require("../DB/connect");
const authRoutes = require('../routes/authRoutes');
const formRoutes = require("../routes/formRoutes");
const adminRoutes = require('../Admin/adminRoutes');

const app = express(); 


app.use(cors());
app.use(express.json());


// Connect to MongoDB
connectDB();

// Routes
 app.use('/auth', authRoutes);
 app.use('/form', formRoutes); 

 //Admin Route
 app.use('/admin', adminRoutes);
 app.use('/admin/login', adminRoutes);
 

 

// Start the server
const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});   