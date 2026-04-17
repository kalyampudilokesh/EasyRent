// backend/controllers/userController.js
const asyncHandler = require('express-async-handler'); // Utility to handle async errors
const User = require('../models/userModel'); // Import the User Mongoose Model
const jwt = require('jsonwebtoken'); // JSON Web Token library for authentication

// Helper function to generate a JWT token
// This token will be sent to the client upon successful login/registration
const generateToken = (id) => {
    return jwt.sign(
        { id }, // Payload: typically the user ID
        process.env.JWT_SECRET, // Your secret key from .env for signing the token
        {
            expiresIn: '30d', // Token expiration time (e.g., 30 days)
        }
    );
};

// @desc    Register a new user (Patient, Doctor, or Admin)
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    // Destructure required fields from the request body
    const { name, email, password, type } = req.body;

    // Basic validation: Check if all essential fields are provided
    if (!name || !email || !password || !type) {
        res.status(400); // Bad Request status
        throw new Error('Please add all required fields: name, email, password, type');
    }

    // Check if a user with the provided email already exists in the database
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400); // Bad Request status
        throw new Error('User with this email already exists');
    }

    // Create a new user document in the database
    const user = await User.create({
        name,
        email,
        password, // Mongoose pre-save middleware will hash this password
        type,
        // Set 'isApproved' status based on user type:
        // Doctors need admin approval (false), while Patients and Admins are approved by default (true).
        isApproved: type === 'Doctor' ? false : true,
        // Note: For 'Admin' type, registration should ideally be restricted or done manually by a super-admin.
        // For this app, we assume 'Patient' is the default for public registration, and 'Doctor' needs approval.
    });

    // Check if the user document was successfully created
    if (user) {
        res.status(201).json({ // 201 Created status
            _id: user.id, // User's MongoDB ID
            name: user.name,
            email: user.email,
            type: user.type,
            isApproved: user.isApproved,
            token: generateToken(user._id), // Generate a JWT for immediate login
        });
    } else {
        res.status(400); // Bad Request if user data was invalid for creation
        throw new Error('Invalid user data provided');
    }
});

// @desc    Authenticate a user (login)
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    // Log the attempt to help debug if the request reaches this controller
    console.log('Attempting login for email:', req.body.email);

    // Destructure email and password from the request body
    const { email, password } = req.body;

    // Find the user by their email address in the database
    const user = await User.findOne({ email });

    // Check if the user exists AND if the provided password matches the hashed password
    if (user && (await user.matchPassword(password))) {
        // If the user is a 'Doctor' type, check if their account has been approved by an Admin
        if (user.type === 'Doctor' && !user.isApproved) {
            res.status(403); // Forbidden status
            throw new Error('Your Doctor account is not yet approved by an Admin. Please wait for approval.');
        }
        // If authentication is successful and (if Doctor) approved, send user data and a JWT
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            type: user.type,
            isApproved: user.isApproved,
            token: generateToken(user._id), // Generate a JWT for the session
        });
    } else {
        res.status(400); // Bad Request status
        throw new Error('Invalid email or password'); // Generic error for security (don't specify which is wrong)
    }
});

// @desc    Get logged-in user's data (profile)
// @route   GET /api/users/me
// @access  Private (requires authentication token via 'protect' middleware)
const getMe = asyncHandler(async (res) => { // Removed req from params as it was unused
    // 'req.user' object is populated by the 'protect' middleware (from authMiddleware.js)
    // It contains the user's data (excluding password) based on the JWT.
    res.status(200).json(res.req.user); // Access req.user via res.req.user in this context
});

// Export all controller functions to be used in routes
module.exports = {
    registerUser,
    loginUser,
    getMe,
};
