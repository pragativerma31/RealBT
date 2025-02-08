const express = require("express")
const { createProperty, editProperty, fetchBrokersProperty, deleteProperty, getAllProperties } = require("../controllers/Property")
const { isBroker } = require("../middlewares/Auth");
const router = express.Router()
const { authenticateToken } = require("../middlewares/Auth");
const { PropertyImgupload } = require("../controllers/Uploader");
const { getPropertyLoanOffers } = require("../controllers/loanoffer");


// ********************************************************************************************************
//                                      Property routes
// ********************************************************************************************************

// properties can only be created by brokers
router.post("/createProperty" ,authenticateToken, isBroker ,createProperty);
router.put("/editProperty",authenticateToken,isBroker,editProperty);
router.put("/addPropertyView",authenticateToken,isBroker,PropertyImgupload);
router.get("/fetch-properties",authenticateToken,isBroker,fetchBrokersProperty);
router.delete("/delete-property/:propertyId",authenticateToken,isBroker,deleteProperty);
router.get("/getAllProperties",getAllProperties);

router.get("/getAllloan-offers/:propertyID" , getPropertyLoanOffers);







module.exports = router