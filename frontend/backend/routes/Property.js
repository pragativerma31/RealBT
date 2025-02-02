const express = require("express")
const { createProperty, editProperty } = require("../controllers/Property")
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
router.put("/addPropertyView",authenticateToken,isBroker,PropertyImgupload)






module.exports = router