const userModel = require("../models/userModel");

module.exports = async (req, res, next) => {
  try {
    // Use req.user.id if using an auth middleware that populates req.user, otherwise fallback to req.body.id
    const userId = req.user ? req.user.id : req.body.id;

    // Check if userId is provided
    if (!userId) {
      return res.status(400).send({
        success: false,
        message: "User ID is required for admin access.",
      });
    }

    // Find the user by ID
    const user = await userModel.findById(userId);

    // Check if user exists
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found.",
      });
    }

    // Check if the user is an admin
    if (user.usertype !== "admin") {
      return res.status(401).send({
        success: false,
        message: "Only Admin Access.",
      });
    }

    // Proceed to next middleware if user is admin
    next();
  } catch (error) {
    console.error("Error in adminMiddleware:", error);
    res.status(500).send({
      success: false,
      message: "Unauthorized Access.",
      error: error.message || error,
    });
  }
};
