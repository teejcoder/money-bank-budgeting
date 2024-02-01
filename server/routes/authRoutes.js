// routes/authRoutes.js
const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();

// Login route
router.post("/login", authController.login);

// Logout route
router.post("/logout", authController.logout);

// Error handling middleware
router.use((err, req, res, next) => {
    // Log the error stack trace
    console.error(err.stack);
    
    // Respond with a 500 Internal Server Error and an error message
    res.status(500).json({ error: "Error in authRoutes" });
});

module.exports = router;