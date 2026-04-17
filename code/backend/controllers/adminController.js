// backend/controllers/adminController.js
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Property = require('../models/propertyModel');
const Booking = require('../models/bookingModel');

// @desc    Get all users in the system (for Admin monitoring/management)
// @route   GET /api/admin/users
// @access  Private (Admin only)
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({}).select('-password'); // Fetch all users, exclude passwords for security
    res.status(200).json(users);
});

// @desc    Approve an owner account (Admin action)
// @route   PUT /api/admin/users/:id/approve
// @access  Private (Admin only)
const approveOwner = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        res.status(404); // Not Found
        throw new Error('User not found');
    }

    // Ensure only 'Owner' type users can be approved as owners
    if (user.type !== 'Owner') {
        res.status(400); // Bad Request
        throw new Error('Only users with "Owner" type can be approved as owners');
    }

    user.isApproved = true; // Set isApproved to true
    await user.save(); // Save changes

    res.status(200).json({ message: `Owner ${user.name} approved successfully.`, user });
});

// @desc    Delete a user from the system (Admin action)
// @route   DELETE /api/admin/users/:id
// @access  Private (Admin only)
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        res.status(404); // Not Found
        throw new Error('User not found');
    }

    // Prevent deletion of Admin users themselves for security reasons
    if (user.type === 'Admin') {
        res.status(400); // Bad Request
        throw new Error('Cannot delete an Admin user');
    }

    await User.deleteOne({ _id: req.params.id }); // Delete the user
    res.status(200).json({ message: 'User removed successfully' });
});


// @desc    Get all properties in the system (for Admin monitoring)
// @route   GET /api/admin/properties
// @access  Private (Admin only)
const getAllProperties = asyncHandler(async (req, res) => {
    const properties = await Property.find({}).populate('owner', 'name email'); // Populate owner details
    res.status(200).json(properties);
});

// @desc    Get all bookings in the system (for Admin monitoring)
// @route   GET /api/admin/bookings
// @access  Private (Admin only)
const getAllBookings = asyncHandler(async (req, res) => {
    const bookings = await Booking.find({})
        .populate('renter', 'name email') // Populate renter details
        .populate('owner', 'name email') // Populate owner details
        .populate('property', 'address propertyType rentAmount'); // Populate property details

    res.status(200).json(bookings);
});

module.exports = {
    getAllUsers,
    approveOwner,
    deleteUser,
    getAllProperties,
    getAllBookings,
};