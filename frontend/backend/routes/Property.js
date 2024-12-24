const express = require("express")
const { createProperty } = require("../controllers/Property")
const { isBroker, isBanker } = require("../middlewares/Auth");
const { createLoanOffer, deleteLoanOffer } = require("../controllers/loanoffer");
const router = express.Router()
const { auth } = require("../middlewares/Auth");
const { createcategory } = require("../controllers/category");

// ********************************************************************************************************
//                                      Property routes
// ********************************************************************************************************

// properties can only be created by brokers
router.post("/createProperty" ,auth, isBroker ,createProperty);

//loan offers can only be created by bankers
router.post("/createLoanOffer" ,auth , isBanker, createLoanOffer);

//delete loan offer
router.delete("/deleteLoanOffer" , deleteLoanOffer);


//create category
router.post("/createCategory" , createcategory);


module.exports = router