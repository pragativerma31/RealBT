const express = require("express")
const { createLoanApplication , editLoanApplication, fetchCustomersApplication, getAllLoanApplications} = require("../controllers/loanApplication")
const { isCustomer } = require("../middlewares/Auth");
const router = express.Router()
const { authenticateToken } = require("../middlewares/Auth");
const { getApplicationLoanOffers } = require("../controllers/loanoffer");


// ********************************************************************************************************
//                                      Property routes
// ********************************************************************************************************

// properties can only be created by brokers
router.post("/createLoanApplication" ,authenticateToken, isCustomer ,createLoanApplication);
router.put("/editLoanApplication",authenticateToken,isCustomer,editLoanApplication);
router.get("/getCustomersApplications",authenticateToken,fetchCustomersApplication);
router.get("/getAllApplications",getAllLoanApplications)

router.get("/getAllloan-offers/:loanApplicationID",getApplicationLoanOffers)





module.exports = router