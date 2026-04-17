// backend/controllers/propertyController.js
const asyncHandler = require('express-async-handler');
const Property = require('../models/propertyModel');
const Booking = require('../models/bookingModel');

// @desc    Get all available properties (for Renters/Public to browse)
// @route   GET /api/properties/all
// @access  Public
const getAllPublicProperties = asyncHandler(async (req, res) => {
    // Only fetch properties that are marked as available
    const properties = await Property.find({ isAvailable: true }).populate('owner', 'name email');
    res.status(200).json(properties);
});

// @desc    Get single property details by ID (for Renters/Public to view full info)
// @route   GET /api/properties/:id
// @access  Public
const getPropertyById = asyncHandler(async (req, res) => {
    const property = await Property.findById(req.params.id).populate('owner', 'name email');

    // Check if property exists AND is available
    if (!property || !property.isAvailable) {
        res.status(404);
        throw new Error('Property not found or not currently available');
    }
    res.status(200).json(property);
});

// @desc    Renter submits a new booking request for a property
// @route   POST /api/properties/:id/book
// @access  Private (Renter only)
const createBooking = asyncHandler(async (req, res) => {
    const { renterDetails } = req.body; // Details provided by the renter via the form
    const propertyId = req.params.id; // Property ID from URL parameter

    // Basic validation for renter details
    if (!renterDetails || !renterDetails.name || !renterDetails.email) {
        res.status(400);
        throw new Error('Please provide your name and email for the booking request.');
    }

    const property = await Property.findById(propertyId);

    if (!property) {
        res.status(404);
        throw new Error('Property not found');
    }

    // Ensure the property is available for booking
    if (!property.isAvailable) {
        res.status(400);
        throw new Error('This property is currently not available for booking.');
    }

    // Ensure the logged-in user is actually a Renter
    if (req.user.type !== 'Renter') {
        res.status(403); // Forbidden
        throw new Error('Only renters are authorized to create booking requests.');
    }

    // Create the new booking in the database
    const booking = await Booking.create({
        property: property._id,
        renter: req.user._id, // The ID of the logged-in renter
        owner: property.owner, // The ID of the property's owner
        renterDetails: {
            name: renterDetails.name,
            email: renterDetails.email,
            phone: renterDetails.phone || '', // Optional
            message: renterDetails.message || '', // Optional
        },
        status: 'pending', // Initial status is always pending
    });

    res.status(201).json(booking); // Respond with the created booking
});

// @desc    Get all bookings made by the logged-in renter
// @route   GET /api/properties/renter/bookings
// @access  Private (Renter only)
const getMyRenterBookings = asyncHandler(async (req, res) => {
    // Middleware already ensures user is a Renter
    const bookings = await Booking.find({ renter: req.user.id }) // Find bookings where 'renter' matches logged-in user's ID
        .populate('property', 'address propertyType rentAmount images') // Populate relevant property details
        .populate('owner', 'name email'); // Populate owner's name and email

    res.status(200).json(bookings);
});


module.exports = {
    getAllPublicProperties,
    getPropertyById,
    createBooking,
    getMyRenterBookings,
};