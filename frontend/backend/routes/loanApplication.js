const express = require("express")
const { createLoanApplication , editLoanApplication, fetchCustomersApplication} = require("../controllers/loanApplication")
const { isCustomer } = require("../middlewares/Auth");
const router = express.Router()
const { authenticateToken } = require("../middlewares/Auth");


// ********************************************************************************************************
//                                      Property routes
// ********************************************************************************************************

// properties can only be created by brokers
router.post("/createLoanApplication" ,authenticateToken, isCustomer ,createLoanApplication);
router.put("/editLoanApplication",authenticateToken,isCustomer,editLoanApplication);
router.get("/getAllApplications",authenticateToken,fetchCustomersApplication)






module.exports = router