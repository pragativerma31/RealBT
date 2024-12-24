const express = require("express");
const { deleteUser, updateProfile, getUserDetails, updateProfileImg } = require("../controllers/Profile");
const router = express.Router();
const { auth } = require("../middlewares/Auth");
// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************
// Delet User Account
router.delete("/deleteProfile" , auth , deleteUser);
router.put("/updateProfile" ,auth, updateProfile );
router.get("/getUserdetails" ,auth , getUserDetails );
router.put("/updateprofileImg", updateProfileImg);

module.exports = router 