// backend/models/userModel.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // For password hashing

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensures email is unique
    },
    password: {
        type: String,
        required: true,
    },
    type: { // 'Renter', 'Owner', 'Admin'
        type: String,
        required: true,
        enum: ['Renter', 'Owner', 'Admin'], // Restricts values to these three
        default: 'Renter', // Default role for new registrations
    },
    isApproved: { // Relevant for 'Owner' type; Admin must approve them
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true, // Adds 'createdAt' and 'updatedAt' fields automatically
});

// Middleware to hash password before saving to the database
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) { // Only hash if password is new or has been modified
        next();
    }
    const salt = await bcrypt.genSalt(10); // Generate a salt
    this.password = await bcrypt.hash(this.password, salt); // Hash the password
    next();
});

// Method to compare entered password with the hashed password for login
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;