// backend/controllers/ownerController.js
const asyncHandler = require('express-async-handler'); // For simplifying error handling in async functions
const Property = require('../models/propertyModel');   // Your Property Mongoose Model
const Booking = require('../models/bookingModel');     // Your Booking Mongoose Model
const upload = require('../middlewares/uploadMiddleware'); // Multer middleware for image uploads

// @desc    Add a new property
// @route   POST /api/owners/properties
// @access  Private (Owner only, requires approval)
const addProperty = asyncHandler(async (req, res) => {
    // Multer (upload middleware) processes file uploads. It populates req.body with text fields
    // and req.files with file information. This function (addProperty) runs AFTER Multer.
    upload(req, res, async (err) => {
        if (err) {
            // If Multer encounters an error (e.g., file type not allowed, file size limit)
            res.status(400); // Bad Request
            throw new Error(err); // Throw the Multer error for centralized handling by errorHandler
        }

        // Destructure text fields from req.body
        const { propertyType, adAdType, address, description, rentAmount } = req.body;
        // Map req.files to an array of paths where images are stored (e.g., '/uploads/filename.jpg')
        const images = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];

        // Additional authorization check (though `authorizeRoles` middleware should also cover this)
        if (req.user.type !== 'Owner' || !req.user.isApproved) {
            res.status(403); // Forbidden
            throw new Error('Not authorized: Only approved Owners can add properties.');
        }

        // Validate required text fields
        if (!propertyType || !adAdType || !address || !description || !rentAmount) {
            res.status(400); // Bad Request
            throw new Error('Please add all required property fields: type, ad type, address, description, rent amount.');
        }

        // Create the new property document in the database
        const property = await Property.create({
            owner: req.user.id, // Associate property with the logged-in owner's ID
            propertyType,
            adAdType,
            address,
            description,
            rentAmount,
            images, // Store the array of image paths
            isAvailable: true, // New properties are available by default
        });

        res.status(201).json(property); // Respond with the newly created property
    });
});

// @desc    Get all properties listed by the logged-in owner
// @route   GET /api/owners/properties
// @access  Private (Owner only)
const getMyProperties = asyncHandler(async (req, res) => {
    // Middleware already ensures the user is an approved 'Owner'
    const properties = await Property.find({ owner: req.user.id }); // Find properties by owner's ID
    res.status(200).json(properties); // Respond with the properties
});

// @desc    Update an existing property
// @route   PUT /api/owners/properties/:id
// @access  Private (Owner only)
const updateProperty = asyncHandler(async (req, res) => {
    const property = await Property.findById(req.params.id); // Find the property by ID from URL params

    if (!property) {
        res.status(404); // Not Found
        throw new Error('Property not found');
    }

    // Security check: Ensure the logged-in user is the actual owner of this property
    if (property.owner.toString() !== req.user.id) {
        res.status(401); // Unauthorized
        throw new Error('User not authorized to update this property');
    }

    // Find and update the property document. `new: true` returns the updated document.
    const updatedProperty = await Property.findByIdAndUpdate(
        req.params.id,
        req.body, // Update with data from request body
        { new: true }
    );

    res.status(200).json(updatedProperty); // Respond with the updated property
});

// @desc    Delete a property
// @route   DELETE /api/owners/properties/:id
// @access  Private (Owner only)
const deleteProperty = asyncHandler(async (req, res) => {
    const property = await Property.findById(req.params.id); // Find property by ID

    if (!property) {
        res.status(404); // Not Found
        throw new Error('Property not found');
    }

    // Security check: Ensure the logged-in user is the actual owner of this property
    if (property.owner.toString() !== req.user.id) {
        res.status(401); // Unauthorized
        throw new Error('User not authorized to delete this property');
    }

    await Property.deleteOne({ _id: req.params.id }); // Delete the property document
    res.status(200).json({ message: 'Property removed successfully' }); // Respond with success message
});

// @desc    Get all bookings related to properties owned by the logged-in owner
// @route   GET /api/owners/bookings
// @access  Private (Owner only)
const getOwnerBookings = asyncHandler(async (req, res) => {
    // Middleware already ensures user is an approved 'Owner'

    // 1. Find all properties that belong to the current logged-in owner
    const ownerProperties = await Property.find({ owner: req.user.id }).select('_id');
    const propertyIds = ownerProperties.map(prop => prop._id); // Extract just the MongoDB IDs

    // 2. Find all bookings where the 'property' field is one of the owner's property IDs
    const bookings = await Booking.find({ property: { $in: propertyIds } })
        .populate('renter', 'name email') // Populate 'renter' field with selected user details
        .populate('property', 'address propertyType rentAmount images'); // Populate 'property' field with selected property details

    res.status(200).json(bookings); // Respond with the list of bookings
});

// @desc    Update the status of a specific booking (e.g., 'pending' to 'approved')
// @route   PUT /api/owners/bookings/:id/status
// @access  Private (Owner only)
const updateBookingStatus = asyncHandler(async (req, res) => {
    const { status } = req.body; // Get the new status from the request body
    // Find the booking and populate its associated property to check ownership
    const booking = await Booking.findById(req.params.id).populate('property', 'owner');

    if (!booking) {
        res.status(404); // Not Found
        throw new Error('Booking not found');
    }

    // Security check: Ensure the logged-in user is the owner of the property associated with this booking
    if (booking.property.owner.toString() !== req.user.id) {
        res.status(401); // Unauthorized
        throw new Error('User not authorized to update this booking');
    }

    // Validate the new status against allowed values
    if (!['approved', 'rejected', 'completed'].includes(status)) {
        res.status(400); // Bad Request
        throw new Error('Invalid booking status provided. Allowed statuses: approved, rejected, completed.');
    }

    booking.status = status; // Update the booking status
    await booking.save();     // Save the updated booking to the database

    res.status(200).json(booking); // Respond with the updated booking
});


// Export all controller functions so they can be imported and used in routes
module.exports = {
    addProperty,
    getMyProperties,
    updateProperty,
    deleteProperty,
    getOwnerBookings,
    updateBookingStatus,
};