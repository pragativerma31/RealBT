const express = require("express")
const { createProperty } = require("../controllers/Property")
const { isBroker, isBanker } = require("../middlewares/Auth");
const router = express.Router()
const { auth } = require("../middlewares/Auth");


// ********************************************************************************************************
//                                      Property routes
// ********************************************************************************************************

// properties can only be created by brokers
router.post("/createProperty" ,auth, isBroker ,createProperty);






module.exports = router