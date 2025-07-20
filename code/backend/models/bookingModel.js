// backend/models/bookingModel.js
const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    property: { // References the property being booked
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Property', // Reference to the 'Property' model
    },
    renter: { // References the User who is making the booking (type 'Renter')
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User', // Reference to the 'User' model
    },
    owner: { // References the User who owns the property being booked (type 'Owner')
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User', // Reference to the 'User' model
    },
    renterDetails: { // Details provided by the renter in the booking form
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String }, // Optional field
        message: { type: String }, // Optional field
    },
    status: { // Current status of the booking request
        type: String,
        required: true,
        enum: ['pending', 'approved', 'rejected', 'completed'], // Restricted values
        default: 'pending', // Initial status
    },
}, {
    timestamps: true, // Adds 'createdAt' and 'updatedAt' fields
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;