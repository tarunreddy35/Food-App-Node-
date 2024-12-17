const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { createFoodController, getAllFoodsController, getSingleController, getSingleFoodController, getFoodByResturantController, updateFoodController, deleteFoodController, placeOrderController, orderStatusController } = require('../controllers/foodController');
const adminMiddleware = require('../middlewares/adminMiddleware');

// Routes
// CREATE FOOD
router.post('/create',authMiddleware, createFoodController);

//GET ALL FOOD
router.get('/getAll',getAllFoodsController);

//GET SINGLE FOOD
router.get('/get/:id', getSingleFoodController);

//GET FOOD RESTURANT
router.get('/getByResturant/:id', getFoodByResturantController);

//UPDATE FOOD 
router.put('/update/:id',authMiddleware, updateFoodController );

//DELETE
router.delete('/delete/:id',authMiddleware, deleteFoodController );

//Order FOOd
router.post('/placeorder',authMiddleware, placeOrderController);

//Order Status
router.post('/orderStatus/:id', authMiddleware, adminMiddleware, orderStatusController)


module.exports = router;
