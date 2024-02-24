const jwt = require("jsonwebtoken");
require("dotenv").config();

function adminAuthenticate(req, res, next) {
    // Assuming you have an 'Authorization' header with JWT token
    const token = req.headers.authorization;

    if(!token) {
        return res.status(401).json({message: 'Unauthorized'});
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({message : 'Unauthorized' });
        }

        // Check if the decoded token has the expected email and password
        if (decoded.email === process.env.ADMIN_EMAIL && decoded.password === process.env.ADMIN_PASSWORD) {
            // User is authorized, proceed to next middleware or route handler
            req.user = decoded;
            next();
        } else {
            return res.status(401).json({message : 'Unauthorized' });
        }
    });
} 

module.exports = { adminAuthenticate };