// backend/routes/propertyRoutes.js
const express = require('express');
const router = express.Router();
const {
    getAllPublicProperties,
    getPropertyById,
    createBooking,
    getMyRenterBookings,
} = require('../controllers/propertyController');
const { protect, authorizeRoles } = require('../middlewares/authMiddleware'); // Import middleware

// Publicly accessible property Browse routes
router.get('/all', getAllPublicProperties); // Get all available properties for anyone to see
router.get('/:id', getPropertyById);       // Get details of a single property

// Renter-specific booking routes (require authentication as 'Renter')
router.post('/:id/book', protect, authorizeRoles('Renter'), createBooking); // POST to create a booking request
router.get('/renter/bookings', protect, authorizeRoles('Renter'), getMyRenterBookings); // GET all bookings made by the logged-in renter

module.exports = router;