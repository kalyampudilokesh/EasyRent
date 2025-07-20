// backend/routes/ownerRoutes.js

const express = require('express');
const router = express.Router();
const { addProperty, getMyProperties } = require('../controllers/ownerController');
const upload = require('../middlewares/uploadMiddleware'); // ✅ Should be a function
const { protect, authorizeRoles } = require('../middlewares/authMiddleware');

router.use(protect, authorizeRoles('Owner'));

router.route('/properties')
  .post(upload, addProperty) // ✅ First multer middleware, then controller
  .get(getMyProperties);

module.exports = router;
