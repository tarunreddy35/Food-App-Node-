const resturantModel = require("../models/resturantModel");

//Create resturant
const createResturantController = async (req,res) => {
    try{
        const {title,imageUrl,foods,time,pickup,delivery,isOpen,logoUrl,rating,ratingCount,code,coords} = req.body

        //validation
        if(!title || !coords){
            return res.status(500).send({
                success:false,
                message:'Please Provide title and Address'
            });
        }
        const newResturant = new resturantModel({title,imageUrl,foods,time,pickup,delivery,isOpen,logoUrl,rating,ratingCount,code,coords})
        await newResturant.save();
        res.status(200).send({
            success: true,
            message:'New Resturant Created successfully.'
        })

    } catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Create  Resuturant API',
            error
        })
    }
};

// GET ALL RESTURANT 
const getAllResturantController = async(req,res) => {
    try{
        const resturants = await resturantModel.find({})
        if(!resturants){
            return res.status(404).send({
                success:false,
                message:'No Resutarant available'
            })
        }
        res.status(200).send({
            success:true,
            totalCount:resturants.length,
            resturants
        });
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in get all resturant api ',
            error
        })
    }
};

//Get Resturant By ID
 const getAllResturantByIdController = async (req,res) => {
    try{
        const resturantId = req.params.id
        if(!resturantId){
            return res.status(404).send({
                success:false,
                message:'please provide resturant Id'
            });
        }
        //find resturant
        const resturant = await resturantModel.findById(resturantId)
        if(!resturant){
            return res.status(404).send({
                success: false,
                message:'no resturant found'
            });
        }
        res.status(200).send({
            success:true,
            resturant,
        })

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in get  resturant by id api'
        })
    }
 };

 //DELETE RESTURANT 
 const deleteResturantController = async (req, res) => {
    try {
        const resturantId = req.params.id;
        if(!resturantId){
            return res.status(404).send({
                success:false,
                message:'No Resturant Found OR Provide Resturant ID',
                error,
            });
        }
        await resturantModel.findByIdAndDelete(resturantId)
        res.status(200).send({
            success:true,
            message: 'Resturant successfully deleted'
        })

       

    } catch (error) {
        console.log( error);
        res.status(500).send({
            success: false,
            message: 'Error in delete restaurant API',
            error,
        });
    }
 };

module.exports = { 
    createResturantController,
     getAllResturantController,
      getAllResturantByIdController,
    deleteResturantController };