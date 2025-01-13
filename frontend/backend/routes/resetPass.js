const express = require("express")
const { auth,  } = require("../middlewares/Auth");
const { resetPassToken, resetPassword } = require("../controllers/ResetPass");
const router = express.Router()


// ********************************************************************************************************
//                                      Reset Password routes
// ********************************************************************************************************

//create category
router.post("/reset-password-token" , resetPassToken );//,auth ,

//showAll categories
router.post("/reset-password" , resetPassword); //,auth 


module.exports = router