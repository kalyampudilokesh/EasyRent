// backend/routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const { protect, authorizeRoles } = require('../middlewares/authMiddleware');
const {
    getAllUsers,
    approveOwner,
    deleteUser,
    getAllProperties,
    getAllBookings,
} = require('../controllers/adminController');

// Apply authentication and authorization middleware to ALL admin routes below
// Ensures only 'Admin' type users can access these routes
router.use(protect, authorizeRoles('Admin'));

// User management routes (Admin)
router.get('/users', getAllUsers);             // GET all users
router.put('/users/:id/approve', approveOwner); // PUT to approve an owner account
router.delete('/users/:id', deleteUser);       // DELETE a user

// Property monitoring routes (Admin)
router.get('/properties', getAllProperties);   // GET all properties in the system

// Booking monitoring routes (Admin)
router.get('/bookings', getAllBookings);       // GET all bookings in the system

module.exports = router;