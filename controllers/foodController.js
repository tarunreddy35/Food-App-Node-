const foodModel = require("../models/foodModel");
const orderModel = require("../models/orderModel");

// create food
const createFoodController =async (req,res) => {
    try{
        const {
            title,
            description,
            price,
            imageUrl,
            foodTags,
            catgeory,
            code,
            isAvailabe,
            resturant,
            rating,
        } = req.body;

        if(!title || !description || !price || !resturant){
            return res.status(500).send({
                success:false,
                message:'Please Provide ALL Feilds'
            });
        }
        const newFood = new foodModel({
            title,
            description,
            price,
            imageUrl,
            foodTags,
            catgeory,
            code,
            isAvailabe,
            resturant,
            rating,
        });

        await newFood.save();
        res.status(200).send({
            success: true,
            message:'New Food Item Created.',
            newFood,
        })

    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in create food API',
            error,
        });
            
    }
        
    
        
};
//GET ALL FOOD
const getAllFoodsController = async (req, res) => {
    try {
      const foods = await foodModel.find({});
      if (!foods) {
        return res.status(404).send({
          success: false,
          message: "no food items was found",
        });
      }
      res.status(200).send({
        success: true,
        totalFoods: foods.length,
        foods,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Erro In Get ALL Foods API",
        error,
      });
    }
  };

  //get single food
  const getSingleFoodController = async (req,res) => {
    try {
        const foodId = req.params.id;
        if (!foodId) {
          return res.status(404).send({
            success: false,
            message: "please provide id",
          });
        }
        const food = await foodModel.findById(foodId);
        if (!food) {
          return res.status(404).send({
            success: false,
            message: "No Food Found with htis id",
          });
        }
        res.status(200).send({
          success: true,
          food,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "Error In get SIngle Food API",
          error,
        });
      }
  };
//FOOD BY RESTURANT 
const getFoodByResturantController = async (req, res) => {
    try {
      const resturantId = req.params.id;
      if (!resturantId) {
        return res.status(404).send({
          success: false,
          message: "please provide id",
        });
      }
      const food = await foodModel.find({ resturnat: resturantId });
      if (!food) {
        return res.status(404).send({
          success: false,
          message: "No Food Found with this id",
        });
      }
      res.status(200).send({
        success: true,
        message: "food base on resturant",
        food,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error In food by resturant  API",
        error,
      });
    }
  };
  
  //update food item
  const updateFoodController = async (req, res) => {
    try {
      const foodID = req.params.id;
      if (!foodID) {
        return res.status(404).send({
          success: false,
          message: "no food id was found",
        });
      }
      const food = await foodModel.findById(foodID);
      if (!food) {
        return res.status(404).send({
          success: false,
          message: "No Food Found",
        });
      }
      const {
        title,
        description,
        price,
        imageUrl,
        foodTags,
        catgeory,
        code,
        isAvailabe,
        resturnat,
        rating,
      } = req.body;
      const updatedFood = await foodModel.findByIdAndUpdate(
        foodID,
        {
          title,
          description,
          price,
          imageUrl,
          foodTags,
          catgeory,
          code,
          isAvailabe,
          resturnat,
          rating,
        },
        { new: true }
      );
      res.status(200).send({
        success: true,
        message: "Food Item Was Updated",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Erorr In Update Food API",
        error,
      });
    }
  };


  //DELETE ITEM
  const deleteFoodController = async(req,res) => {
    try{
      const foodId = req.params.id;
      if (!foodId) {
        return res.status(404).send({
          success: false,
          message: "please provide id",
        });
      }
      const food = await foodModel.findById(foodId)
      if(!foodId){
        return res.status(404).send({
          success:false,
          message:'no food found by this id'
        });
      }
      await foodModel.findByIdAndDelete(foodId)
      res.status(200).send({
        success:true,
        message:'successfully food item deleted'
      })
    }catch(error){
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Erorr In Delete Food API",
        error,
    });
  }

  }

  // PLACE ORDER
  const placeOrderController = async (req,res) =>{
    try{
      const {cart} = req.body;
      if(!cart ){
        return res.status(500).send({
          success: false,
          message: "Please add food Cart or payment Method",
        });
      }
      let total = 0
      //CAL
      cart.map((i) =>{
        total += i.price
      }  )
      const newOrder = new orderModel({
        foods:cart,
        payment:total,
        buyer:req.body.id
      });
      await newOrder.save()

      res.status(201).send({
        success:true,
        message:'Order Placed Successfully',
        newOrder,
      })
    }catch(error){
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Erorr In Place Order API",
        error,
    });
    }
  };

  // CHANGE ORDER STATUS
  const orderStatusController = async (req, res) => {
    try {
      const orderId = req.params.id;
      if (!orderId) {
        return res.status(404).send({
          success: false,
          message: "Please Provide valid order id",
        });
      }
      const { status } = req.body;
      const order = await orderModel.findByIdAndUpdate(
        orderId,
        { status },
        { new: true }
      );
      res.status(200).send({
        success: true,
        message: "Order Status Updated",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error In Order Status API",
        error,
      });
    }
  };
  
module.exports = {createFoodController,getAllFoodsController, getSingleFoodController, getFoodByResturantController,updateFoodController, deleteFoodController,placeOrderController, orderStatusController};
