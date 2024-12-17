const JWT = require('jsonwebtoken');

// Helper function to handle JWT.verify as a Promise
const verifyToken = (token, secret) => {
    return new Promise((resolve, reject) => {
        JWT.verify(token, secret, (err, decoded) => {
            if (err) return reject(err);
            resolve(decoded);
        });
    });
};

module.exports = async function (req, res, next) {
    try {
        // Get token from the authorization header

        // Check if the token is missing or malformed
        if (!req.headers['authorization'] || !req.headers['authorization'].startsWith('bearer ')) {
            return res.status(401).send({
                success: false,
                message: 'Authorization token missing or malformed',
            });
        }

        // Extract the token after 'Bearer '
        const token = req.headers['authorization'].split(' ')[1];
        if (!token) {
            return res.status(401).send({
                success: false,
                message: 'Token not found',
            });
        }

        // Verify the token using the helper function
        const decoded = await verifyToken(token, process.env.JWT_SECRET);

        // Attach user ID to the request object
        req.user = { id: decoded.id };

        // Proceed to the next middleware
        next();
    } catch (error) {
        console.error('Error in token verification:', error);

        // Handle specific JWT errors
        if (error.name === 'TokenExpiredError') {
            return res.status(401).send({
                success: false,
                message: 'Token has expired, please log in again',
            });
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(401).send({
                success: false,
                message: 'Invalid token, unauthorized access',
            });
        }

        // General error response
        res.status(500).send({
            success: false,
            message: 'Server error during token verification',
            error,
        });
    }
};
