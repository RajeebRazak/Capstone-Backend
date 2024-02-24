const User = require("../models/userschema");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.authMiddleware = (req , res , next) => {
    const token = req.header('x-auth-token');
 console.log("hello",token);
    if (!token) {
        return res.status(401).json({ msg: 'No authentication token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded.user;

        next();
    } catch (error) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
}

