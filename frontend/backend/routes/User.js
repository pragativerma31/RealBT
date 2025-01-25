// Import the required modules
const express = require("express");
const { LogIN, signUP, sendOTP, changePassword, LogOut } = require("../controllers/Auth");
const { auth, authenticateToken } = require("../middlewares/Auth");
const router = express.Router();

// Import the required controllers and middleware function




// Routes for Login, Signup, and Authentication

// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************


// Route for user login
router.post("/login",LogIN);

// Route for user signup
router.post("/signup" , signUP);

// Route for user logout
router.post("/logout" ,authenticateToken, LogOut);

// Route for sending OTP to the user's email
router.post("/sendOTP" , sendOTP)

// Route for Changing the password
router.put("/changePassword" , authenticateToken , changePassword);


// Export the router for use in the main application
module.exports = router;