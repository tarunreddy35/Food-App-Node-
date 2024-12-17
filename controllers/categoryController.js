const categoryModel = require("../models/categoryModel");

//create category
const createCatController = async (req, res) => {
    try {
      const { title, imageUrl } = req.body;
      //valdn
      if (!title) {
        return res.status(500).send({
          success: false,
          message: "please provide category title or image",
        });
      }
      const newCategory = new categoryModel({ title, imageUrl });
      await newCategory.save();
      res.status(201).send({
        success: true,
        message: "category created",
        newCategory,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error In Create Cat API",
        error,
      });
    }
  };

//get all cate
const getAllCatController = async (req,res) => {
    try{
        const categories = await categoryModel.find({})
        if(!categories){
            return res.status(404).send({
                success:false,
                message:'No Categories Found'
            });
        }
        res.status(200).send({
            success:true,
            totalCat: categories.length,
            categories
        });
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in GET ALL Category Api',
            error
        })
    }
};

// UPDATE CAT
const updateCatController = async (req,res) =>  {
    try{
        const {id} = req.params;
        const {title,imageUrl} = req.body;
        const updatedCategory = await categoryModel.findByIdAndUpdate(
            id,
            {title,imageUrl},
             {new:true}
            );
        if(!updatedCategory){
            return res.status(500).send({
                success:false,
                message:' NO Category found'
            });
        }
        res.status(200).send({
            success:true,
            message:'Category Updated Successfully'
        });
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Update Category API',
            error
        })
    }
};

//delete cat
const deleteCatController = async (req,res) => {
    try{
        const {id} = req.params;
        if(!id){
            return res.status(500).send({
                success:false,
                message:' Please Provide Category ID'
            });
        }
        const category = await categoryModel.findById(id)
        if(!category){
            return res.status(500).send({
                success:false,
                message:'No Category Found With this Id'
            });
        }
        await categoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success:true,
            message:'Category Successfully Deleted'
        });

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Delete Category API',
            error
        })
    }
};

module.exports = {createCatController,getAllCatController, updateCatController, deleteCatController};