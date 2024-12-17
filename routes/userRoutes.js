
const express = require('express');
const router = express.Router();
const { 
    getUserController, 
    updateUserController, 
    resetPasswordController, 
    updatePasswordController, 
    deleteProfileController
} = require('../controllers/userController'); // Removed '.default'
const authMiddleware = require('../middlewares/authMiddleware');

// Routes

// Get USER || GET
router.get('/getUser', authMiddleware, getUserController);

// UPDATE PROFILE 
router.put('/updateUser', authMiddleware, updateUserController);
 
// Reset password (No auth middleware, as user may not be logged in)
router.post('/resetPassword', resetPasswordController);

// Update password
router.post('/updatePassword', authMiddleware, updatePasswordController);

//DELETE USER
router.delete('/deleteUser/:id', authMiddleware,deleteProfileController)


module.exports = router;