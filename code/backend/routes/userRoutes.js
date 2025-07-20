// backend/routes/userRoutes.js
const path = require('path');
const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe } = require('../controllers/userController');
const { protect } = require(path.join(__dirname, '../middlewares/authMiddleware'));
router.post('/register', registerUser); // Public route for new user registration
router.post('/login', loginUser);       // Public route for user login
router.get('/me', protect, getMe);      // Private route to get logged-in user's profile (requires JWT)

module.exports = router;