const express = require("express");
const { deleteUser, updateProfile, getUserDetails, updateProfileImg } = require("../controllers/Profile");
const router = express.Router();
const { auth, authenticateToken } = require("../middlewares/Auth");
// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************
// Delet User Account
router.delete("/deleteProfile" , authenticateToken, deleteUser);
router.put("/updateProfile" ,authenticateToken, updateProfile );
router.get("/getUserdetails" ,auth , getUserDetails );
router.put("/updateprofileImg",authenticateToken, updateProfileImg);

module.exports = router 