const express = require("express");
const apiController = require("../controllers/apiController");
const router = express.Router();

// Register a new user
router.post("/executeFlow", apiController.executeFlow);

// Get Basiq user details
router.get("/getBasiqUser", apiController.getBasiqUser);

// Create a new Basiq user
router.post("/createBasiqUser", apiController.createBasiqUser);

// Get consents
router.get("/getConsents", apiController.getConsents);

// Get account details
router.get("/getAccount", apiController.getAccount);

// Post authentication link
router.post("/postAuthLink", apiController.postAuthLink);

// Get transaction details
router.get("/getTransactions", apiController.getTransactions);

// Error handling middleware
router.use((err, req, res, next) => {
  // Log the error stack trace
  console.error(err.stack);
  
  // Respond with a 500 Internal Server Error and an error message
  res.status(500).json({ error: "Error in apiRoutes" });
});

module.exports = router;
