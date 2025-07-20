// backend/middlewares/authMiddleware.js
const jwt = require('jsonwebtoken'); // For signing and verifying JWTs
const asyncHandler = require('express-async-handler'); // A utility to simplify async Express routes by catching errors
const User = require('../models/userModel'); // Import your User model

// Middleware to protect routes: ensures user is authenticated with a valid JWT
const protect = asyncHandler(async (req, res, next) => {
    let token;

    // Check if Authorization header exists and starts with 'Bearer'
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header (e.g., "Bearer eyJhbGci..." -> "eyJhbGci...")
            token = req.headers.authorization.split(' ')[1];

            // Verify the token using your JWT_SECRET
            // This decodes the token and checks its signature
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Find the user associated with the token's ID (payload 'id')
            // .select('-password') excludes the password field from the returned user object for security
            req.user = await User.findById(decoded.id).select('-password');

            // If user not found (e.g., deleted account)
            if (!req.user) {
                res.status(401); // Unauthorized
                throw new Error('Not authorized, user associated with token not found');
            }

            next(); // User is authenticated, proceed to the next middleware/controller
        } catch (error) {
            console.error('Authentication Error:', error); // Log the specific error
            res.status(401); // Unauthorized
            throw new Error('Not authorized, token failed or expired');
        }
    }

    // If no token was found in the header
    if (!token) {
        res.status(401); // Unauthorized
        throw new Error('Not authorized, no token provided');
    }
});

// Middleware to authorize users based on their 'type' (role)
const authorizeRoles = (...roles) => { // Takes an array of allowed roles (e.g., 'Admin', 'Owner')
    return (req, res, next) => {
        // 'req.user' is populated by the 'protect' middleware that runs before this
        if (!req.user || !roles.includes(req.user.type)) {
            res.status(403); // Forbidden
            throw new Error('Not authorized to access this route. Insufficient role.');
        }

        // Special check for 'Owner' role: ensure they are also approved by an Admin
        if (req.user.type === 'Owner' && !req.user.isApproved) {
            res.status(403); // Forbidden
            throw new Error('Owner account not yet approved by Admin. Access denied.');
        }

        next(); // User is authorized, proceed
    };
};

module.exports = { protect, authorizeRoles };