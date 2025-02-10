const express = require("express")
const router = express.Router()
const { auth, authenticateToken } = require("../middlewares/Auth");
const {isBanker } = require("../middlewares/Auth");
const {  deleteLoanOffer, showAllLoanOffers, createLoanOfferForProperty, createLoanOfferForApplication, getAllBankersOffer } = require("../controllers/loanoffer");

// ********************************************************************************************************
//                                      Loan Offer routes
// ********************************************************************************************************


//loan offers can only be created by bankers
router.post("/createLoanOfferForProperty" ,authenticateToken, createLoanOfferForProperty);
router.post("/createLoanOfferForApplication" ,authenticateToken, createLoanOfferForApplication);

//delete loan offer
router.delete("/deleteLoanOffer" ,authenticateToken,isBanker, deleteLoanOffer);

//show all offers
router.get("/allLoanOffers" , auth , showAllLoanOffers);
router.get("/getAllBankers-offers",authenticateToken,isBanker,getAllBankersOffer)


module.exports = router