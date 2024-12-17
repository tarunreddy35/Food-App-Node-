const userModel = require("../models/userModel");
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');

// Register
const registerController = async (req, res) => {
    try {
        const { username, email, password, phone, address, answer } = req.body;

        // Check if all fields are provided
        if (!username || !email || !password || !phone || !address || !answer) {
            return res.status(400).send({
                success: false,
                message: 'Please provide all fields',
            });
        }

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).send({
                success: false,
                message: 'Email already registered, please login',
            });
        }

        // Hashing password
        const salt = await bcrypt.genSalt(15);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new userModel({
            username,
            email,
            password: hashedPassword,
            phone,
            address,
            answer,
        });
        
        await newUser.save();

        // Successful registration response
        res.status(201).send({
            success: true,
            message: 'Successfully registered',
            user: {
                username: newUser.username,
                email: newUser.email,
                phone: newUser.phone,
                address: newUser.address,
                // Exclude sensitive fields like password and answer
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Register API',
            error: 'Server error',
        });
    }
};


const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation: Check if both email and password are provided
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: 'Please provide both email and password',
            });
        }

        // Find user by email
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(401).send({
                success: false,
                message: 'User Not Found' // Generic error message
            });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send({
                success: false,
                message: 'Invalid credentials', // Generic error message
            });
        }

        // Generate token
        const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d', // Token expires in 7 days
        });

        // Exclude password from response
        user.password = undefined;

        res.status(200).send({
            success: true,
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                phone: user.phone,
                address: user.address,
                // Exclude sensitive fields like password and answer
            },
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Login API',
            error: 'Server error',
        });
    }
};


module.exports = { registerController, loginController };
