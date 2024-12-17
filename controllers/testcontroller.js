const testUserController = (req, res) => {
    try {
        // Successful response with consistent JSON format
        res.status(200).send({
            success: true,
            message: 'Test User Data',
            data: '<h1>Test User Data</h1>', // HTML content can still be included if needed
        });
    } catch (error) {
        console.error('Error in Test API:', error); // Changed to console.error for better logging
        res.status(500).send({
            success: false,
            message: 'Error in Test API',
            error: error.message, // Error message for debugging
        });
    }
};

module.exports = { testUserController };
