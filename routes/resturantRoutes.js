const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { 
    createResturantController, 
    getAllResturantController, 
    getAllResturantByIdController, 
    deleteResturantController 
} = require('../controllers/resturantController');

// Routes
// CREATE RESTAURANT || POST
router.post('/create', authMiddleware, createResturantController);

// GET ALL RESTAURANTS || GET
router.get('/getAll', getAllResturantController);

// GET RESTAURANT BY ID || GET
router.get('/get/:id', getAllResturantByIdController);

// DELETE RESTAURANT || DELETE
router.delete('/delete/:id', authMiddleware, deleteResturantController); // Removed the extra dot

module.exports = router;
