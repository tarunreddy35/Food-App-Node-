const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { createCatController, getAllCatController, updateCatController, deleteCatController } = require('../controllers/categoryController');


// Routes
// Create category
router.post('/create',authMiddleware,createCatController)

//GET ALL CATEGORY
router.get('/getAll', getAllCatController);

//UPDATE CAT
router.put('/update/:id', authMiddleware, updateCatController );

//DELETE CAT
router.delete('/delete/:id',authMiddleware, deleteCatController )

module.exports = router;
