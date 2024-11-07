// routes/authRoutes.js
const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();

// Login route
router.post("/login", authController.login);
router.get("/session", authController.session);

module.exports = router;