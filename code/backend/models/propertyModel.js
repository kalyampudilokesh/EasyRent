// backend/models/propertyModel.js
const mongoose = require('mongoose');

const propertySchema = mongoose.Schema({
    owner: { // References the User who owns this property (type 'Owner')
        type: mongoose.Schema.Types.ObjectId, // MongoDB ObjectId type
        required: true,
        ref: 'User', // Establishes a reference to the 'User' model
    },
    propertyType: { // e.g., 'Apartment', 'House', 'Condo', 'Villa'
        type: String,
        required: true,
    },
    adAdType: { // Type of advertisement: 'Rent' or 'Sale'
        type: String,
        required: true,
        enum: ['Rent', 'Sale'],
    },
    isAvailable: { // Indicates if the property is currently available for booking/rent
        type: Boolean,
        default: true,
    },
    address: {
        type: String,
        required: true,
    },
    description: { // Detailed information about the property
        type: String,
        required: true,
    },
    images: [{ // Array of strings to store paths/URLs of uploaded images
        type: String,
    }],
    rentAmount: { // The rental amount or price of the property
        type: Number,
        required: true,
    },
}, {
    timestamps: true, // Adds 'createdAt' and 'updatedAt' fields
});

const Property = mongoose.model('Property', propertySchema);
module.exports = Property;