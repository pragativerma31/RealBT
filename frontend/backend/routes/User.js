// Import the required modules
const express = require("express");
const { LogIN, signUP, sendOTP, changePassword } = require("../controllers/Auth");
const { auth } = require("../middlewares/Auth");
const { resetPassToken, resetPassword } = require("../controllers/ResetPass");
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

// Route for sending OTP to the user's email
router.post("/sendOTP" , sendOTP)

// Route for Changing the password
router.post("/changePassword" , auth , changePassword);


// ********************************************************************************************************
//                                      Reset Password
// ********************************************************************************************************


// Route for generating a reset password token
router.post("/reset-password-token" , resetPassToken);

// Route for resetting user's password after verification
router.post("/reset-password" , resetPassword);

// Export the router for use in the main application
module.exports = router;