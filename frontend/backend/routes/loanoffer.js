const express = require("express")
const router = express.Router()
const { auth } = require("../middlewares/Auth");
const {isBanker } = require("../middlewares/Auth");
const { createLoanOffer, deleteLoanOffer, showAllLoanOffers } = require("../controllers/loanoffer");

// ********************************************************************************************************
//                                      Loan Offer routes
// ********************************************************************************************************


//loan offers can only be created by bankers
router.post("/createLoanOffer" ,auth , isBanker, createLoanOffer);

//delete loan offer
router.delete("/deleteLoanOffer" ,auth,isBanker, deleteLoanOffer);

//show all offers
router.get("/allLoanOffers" , auth , showAllLoanOffers);

module.exports = router