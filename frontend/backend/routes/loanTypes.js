const express = require("express")
const {  fetchLoanTypes , createLoanType } = require("../controllers/loanTypes")
const router = express.Router()
const { authenticateToken } = require("../middlewares/Auth");


// ********************************************************************************************************
//                                      Property routes
// ********************************************************************************************************

router.post("/createLoanType" , createLoanType)
router.get("/getAllLoanTypes",fetchLoanTypes);

module.exports = router