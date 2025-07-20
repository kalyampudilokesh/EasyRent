// backend/index.js
const express = require('express');
const dotenv = require('dotenv').config(); // Load environment variables from .env
const connectDB = require('./config/connect'); // Import database connection function
const { errorHandler } = require('./middlewares/errorHandler'); // Import custom error handler
const cors = require('cors'); // Import CORS middleware for cross-origin requests
const path = require('path'); // Node.js path module for working with file paths

const port = process.env.PORT || 5000; // Set server port from .env or default to 5000

connectDB(); // Connect to MongoDB database

const app = express();

app.use(cors()); // Enable CORS for all routes (important for frontend-backend communication)
app.use(express.json()); // Middleware to parse incoming JSON request bodies
app.use(express.urlencoded({ extended: false })); // Middleware to parse URL-encoded request bodies

// Serve static files from the 'uploads' directory
// This makes images uploaded via Multer accessible via /uploads/filename.jpg
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Define API routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/owners', require('./routes/ownerRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/properties', require('./routes/propertyRoutes')); // Property routes for public/renter access

// Serve frontend in production
// This block is for when you build your React app (npm run build) and want to serve it from the same Node.js server
if (process.env.NODE_ENV === 'production') {
    // Set static folder (pointing to the React build output)
    app.use(express.static(path.join(__dirname, '../frontend/build')));

    // For any other route, serve the React app's index.html
    app.get('*', (req, res) =>
        res.sendFile(
            path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
        )
    );
} else {
    // In development, just indicate the server is running
    app.get('/', (req, res) => res.send('API server is running in development mode. Set NODE_ENV to production to serve frontend.'));
}

// Global error handling middleware (must be last middleware)
app.use(errorHandler);

// Start the server
app.listen(port, () => console.log(`Server started on port ${port}`));