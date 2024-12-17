const userModel = require("../models/userModel");
const bcrypt = require('bcryptjs');

// GET USER INFO
const getUserController = async (req, res) => {
    try {
        // Assuming the user ID is extracted from the authentication middleware (e.g., JWT)
        const userId = req.user.id;

        // Find user by ID
        const user = await userModel.findById(userId).select('-password'); // Exclude the password directly

        // Validate if user exists
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User Not Found',
            });
        }

        // Respond with user details
        res.status(200).send({
            success: true,
            message: 'User retrieval successful',
            user,
        });
    } catch (error) {
        console.error('Error in Get User API:', error);
        res.status(500).send({
            success: false,
            message: 'Internal Server Error',
        });
    }
};


// UPDATE USER
const updateUserController = async (req, res) => {
    try {
       console.log('Request Body:', req.body); // Debugging log


        // Ensure the user ID is provided in the request body
        const userId = req.body.id;

        if (!userId) {
           return res.status(400).send({
               success: false,
                message: 'User ID is required',
            });
        }

        // Find user by ID from request body
        const user = await userModel.findById(userId);

        // Validate if user exists
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User not found',
            });
        }

        // Destructure fields to update
        const { username, address, phone } = req.body;

        // Update user details only if they are provided
        if (username) user.username = username;
        if (address) user.address = address;
        if (phone) user.phone = phone;

        // Save updated user details
        await user.save();

        // Exclude password from the user object before sending it back
        user.password = undefined;

        res.status(200).send({
            success: true,
            message: 'User updated successfully',
            user,
        });

    } catch (error) {
        console.error('Error in Update User API:', error);
        res.status(500).send({
            success: false,
            message: 'Error in Update User API',
            error: error.message || 'Internal Server Error',
        });
    }
}

 // UPDATE USER PASSWORD
const updatePasswordController = async (req, res) => {
    try {
        const user = await userModel.findById(req.body.id);

        // Validate if user exists
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User not found',
            });
        }

        const { oldPassword, newPassword } = req.body;

        // Validate input fields
        if (!oldPassword || !newPassword) {
            return res.status(400).send({
                success: false,
                message: 'Please provide both old and new passwords',
            });
        }

        // Compare old password with the stored password
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(401).send({
                success: false,
                message: 'Incorrect old password',
            });
        }

        // Hash and update the new password
        const salt = await bcrypt.genSalt(15);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;

        // Save the updated password
        await user.save();

        res.status(200).send({
            success: true,
            message: 'Password updated successfully',
        });

    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error updating password',
            error,
        });
    }
};
   


// RESET PASSWORD
const resetPasswordController = async (req, res) => {
    try {
        const { email, newPassword, answer } = req.body;

        // Validate request body
        if (!email || !newPassword || !answer) {
            return res.status(500).send({
                success: false,
                message: 'Please provide all required fields',
            });
        }

        // Find user by email and security answer
        const user = await userModel.findOne({ email, answer })
        if (!user) {
            return res.status(500).send({
                success: false,
                message: 'Invalid email or answer provided',
            });
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(15);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;

        // Save user with the updated password
        await user.save();

        res.status(200).send({
            success: true,
            message: 'Password reset successfully',
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Password Reset API',
            error,
        });
    }
};

const deleteProfileController= async (req,res)=>{
    try{
        await userModel.findByIdAndDelete(req.param.id)
        return res.status(200).send({
            success: true,
            message:'Your account has been deleted'
        });

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error In Delete profile Api',
            error

        });
    }
};

module.exports = { getUserController, updateUserController, resetPasswordController, updatePasswordController, deleteProfileController };       