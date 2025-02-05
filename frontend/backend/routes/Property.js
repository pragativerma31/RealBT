const express = require("express")
const { createProperty, editProperty, fetchBrokersProperty, deleteProperty } = require("../controllers/Property")
const { isBroker } = require("../middlewares/Auth");
const router = express.Router()
const { authenticateToken } = require("../middlewares/Auth");
const { PropertyImgupload } = require("../controllers/Uploader");


// ********************************************************************************************************
//                                      Property routes
// ********************************************************************************************************

// properties can only be created by brokers
router.post("/createProperty" ,authenticateToken, isBroker ,createProperty);
router.put("/editProperty",authenticateToken,isBroker,editProperty);
router.put("/addPropertyView",authenticateToken,isBroker,PropertyImgupload);
router.get("/fetch-properties",authenticateToken,isBroker,fetchBrokersProperty);
router.delete("/delete-property/:propertyId",authenticateToken,isBroker,deleteProperty)






module.exports = router