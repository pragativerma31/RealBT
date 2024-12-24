const User = require('../models/User');
const mailsender = require('../utils/MailSender');
const { v4: uuidv4 } = require("uuid"); // For unique token generation
const bcrypt = require('bcrypt');

exports.resetPassToken = async(req , res) =>{
    //get email from req body
    try{
        const {email} = req.body;

        const exists = User.findOne({email});

        if(!exists){
            return res.status(400).json({
                success:false,
                message:"User doesnt exists",
            })
        }

        //generate token
        const resetToken = uuidv4();

        //set token and expiration time in user object
        User.token = resetToken;
        User.resetPassTokenExpires = Date.now() + 5*60*1000; // Token expires in 1 hour
        await User.save();

        //create url
        const resetURL = `http://localhost:3000/reset-password/${resetToken}`;
        //send mail
        await mailsender(email , "Reset Your Password" , `Click on the link to reset your password ${resetURL}`);

        return res.status(200).json({
            sucess:true,
            message:"email sent successfully , please check mail and change password"
        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"Something went wrong while send reset Password mail",
        })
    }
}
exports.resetPassword = async(req , res) =>{
    try {
        //get all the details
        const {password , confirmpassword , token} = req.body;

        //validation
        if(password!==confirmpassword){
            return res.status(400).json({
                success:false,
                message:"Password doesnt match",
            })
        }

        //get userdetails from database
        const userdetails = User.findOne({token:token});

        //if no token - invalid
        if(!userdetails){
            return res.status(400).json({
                success:false,
                message:"Token Invalid",
            })
        }

        //token time check
        if(userdetails.resetPassTokenExpires < Date.now()){
            return res.status(400).json({
                success:false,
                message:"Reset Token expired",
            })
        }
        //hash new password
        const hashpass = await bcrypt.hash(password,10);

        await User.findOneAndUpdate({toekn:token} , {password:hashpass} , {new:true})

        //return resposne
        return res.status(200).json({
            success:true,
            message:"password reset successfull",
        })
    } 
    catch (error) {
        return res.status(500).json({
            success:false,
            message:"Something went wrong while reseting Password",
        })
    }
}