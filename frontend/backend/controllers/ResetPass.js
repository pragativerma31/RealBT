const User = require('../models/User');
const mailsender = require('../utils/MailSender');
const { v4: uuidv4 } = require("uuid"); // For unique token generation
const bcrypt = require('bcrypt');
const resetPasswordTemplate = require('../templates/resetPassword')

exports.resetPassToken = async(req , res) =>{
    //get email from req body
    try{
        const {email} = req.body;

        const exists = await User.findOne({email});

        if(!exists){
            return res.status(400).json({
                success:false,
                message:"User doesnt exists",
            })
        }

        //generate token
        const resetToken = uuidv4();

        //set token and expiration time in user object
        exists.resetToken = resetToken;
        exists.resetPassTokenExpires = Date.now() + 5*60*1000; // Token expires in 1 hour
        await exists.save();

        //create url
        const resetURL = `http://localhost:3000/password/reset-password/${resetToken}`;
        //send mail
        await mailsender(email , "Reset Your Password" ,resetPasswordTemplate(resetURL) );

        return res.status(200).json({
            success:true,
            message:"email sent successfully , please check mail and change password"
        })
    }
    catch(err){
        console.error("Error in resetPassToken:", err.message); // Log the error for debugging
        return res.status(500).json({
            success:false,
            message:"Something went wrong while send reset Password mail",
        })
    }
}

exports.resetPassword = async (req, res) => {
    try {
        // Get all the details
        const { password, confirmPassword, resetToken } = req.body;

        // Validation
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match",
            });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Find the user and update password in one call
        const user = await User.findOneAndUpdate(
            { resetToken, resetPassTokenExpires: { $gt: Date.now() } }, // Check token and expiration
            { password: hashedPassword, resetToken: null, resetPassTokenExpires: null }, // Update fields
            { new: true } // Return the updated document
        );

        // If user is not found, token is invalid or expired
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Token is invalid or has expired",
            });
        }

        // Return response
        return res.status(200).json({
            success: true,
            message: "Password reset successful",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while resetting the password",
        });
    }
};
