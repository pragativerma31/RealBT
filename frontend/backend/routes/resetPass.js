const express = require("express")
const { resetPassToken, resetPassword } = require("../controllers/ResetPass");
const router = express.Router()


// ********************************************************************************************************
//                                      Reset Password routes
// ********************************************************************************************************

//create category
router.post("/reset-password-token" , resetPassToken );

//showAll categories
router.post("/reset-password" , resetPassword); 


module.exports = router