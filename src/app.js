const express = require('express');
require("dotenv").config();
const cors = require("cors");
const connectDB = require("../DB/connect");
const authRoutes = require('../routes/authRoutes');

const app = express(); 


app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/auth', authRoutes);
app.use('/protected', protectedRoute);



// Start the server
const PORT = process.env.PORT || 4006;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});