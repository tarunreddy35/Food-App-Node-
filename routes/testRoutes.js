const express = require('express');
const { testUserController } = require('../controllers/testcontroller');

// Router object
const router = express.Router();

// Routes
// Test user route (GET)
router.get('/test-user', testUserController);

// Export router module
module.exports = router;
