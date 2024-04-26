const jwt = require("jsonwebtoken");
require("dotenv").config();

function adminAuthenticate(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            console.error('JWT verification error:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        // Perform additional checks if needed, such as database lookup for admin role

        // Example of checking admin role
        if (decoded.role !== 'admin') {
            return res.status(401).json({ message: 'Unauthorized - not an admin' });
        }

        // Continue to the next middleware if admin role is verified
        next();
    });
} 

module.exports = { adminAuthenticate };
