// backend/middlewares/uploadMiddleware.js

const multer = require('multer');
const path = require('path');

// Define storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// Optional file filter
const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png/;
  const isValid = allowed.test(path.extname(file.originalname).toLowerCase()) && allowed.test(file.mimetype);
  isValid ? cb(null, true) : cb(new Error('Invalid file type'));
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

// ✅ IMPORTANT: Export a middleware function
module.exports = upload.single('image'); // <- adjust 'image' to your form field name
