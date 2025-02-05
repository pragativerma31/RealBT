const express = require("express")
const { createLoanApplication , editLoanApplication} = require("../controllers/loanApplication")
const { isCustomer } = require("../middlewares/Auth");
const router = express.Router()
const { authenticateToken } = require("../middlewares/Auth");


// ********************************************************************************************************
//                                      Property routes
// ********************************************************************************************************

// properties can only be created by brokers
router.post("/createLoanApplication" ,authenticateToken, isCustomer ,createLoanApplication);
router.put("/editLoanApplication",authenticateToken,isCustomer,editLoanApplication);






module.exports = router