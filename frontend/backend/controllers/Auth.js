const User = require('../models/User');
const OTP  = require("../models/OTP");
const otpgenerator = require('otp-generator');
const bcrypt = require('bcrypt');
const Profile = require('../models/Profile');
const jwt = require('jsonwebtoken');
const mailSender = require('../utils/MailSender');

//send otp
exports.sendOTP = async(req, res) => {
    try{
        //fetch the email
        const {email} =req.body;

        //check if user already present
        const checkUSER  = await User.findOne({email});

        if(checkUSER){
            return res.status(401).json({
                success: false,
                message:"User already registered , Try Login in"
            })
        }

        //generate email
        var otp = otpgenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        });
        console.log("Otp generated Successfully");

        //check if otp unique or not
        const result = await OTP.findOne({otp:otp});
        while(result){
            var otp = otpgenerator.generate(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false,
            });

            result = await OTP.findOne({otp:otp});
        }

        const otpPayload = {email , otp};

        //create entry in db
        const otpbody = await OTP.create(otpPayload);
        console.log(otpbody);

        res.status(200).json({
            success:true,
            message:"otp sent successfully"
        })
    }
    catch(err){
        res.status(500).json({
            err,
            success:false.valueOf,
            message:"Error in otp generation"
        })
    }
}

//signup
exports.signUP = async(req,res) =>{
    try{
        //data fetch
        console.log("Request Body:", req.body); 
        const {
            firstName,
            lastName,
            password,
            email,
            otp,
            role
        } =req.body;
    
    
        //find recent otp
        const mostRecentOTP = await OTP.findOne({ email }) // Filter by email if needed
        .sort({ createdAt: -1 }) // Sort by 'createdAt' in descending order
        .limit(1); // Ensure it fetches only one document

        console.log(mostRecentOTP)

        //validate otp
        if(!mostRecentOTP){
            return res.status(401).json({
                success: false,
                message:"Otp not found"
            })
        }
        else if(otp !== mostRecentOTP.otp){
            return res.status(400).json({
                success: false,
                message:"Invalid OTP"
            })
        }

        //hashing the password
        const hashedpass = await bcrypt.hash(password , 10);

        // create entry in db

        const URL = `https://api.dicebear.com/9.x/initials/svg?seed=${firstName} ${lastName}`

        const user =await User.create({
            firstName,
            lastName,
            email,

            role,
            password:hashedpass,
            AdditionalDetails:null,
            imageURL:URL
        });

        const profile  = await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:null,
        });

        user.AdditionalDetails = profile._id;
        await user.save();

        return res.status(201).json({
            success: true,
            message:"User Created Successfully"
        })
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message:"error in creating user",
            err,
        })

    }
         
}

exports.LogIN = async (req, res) => {
    try {
        // Extracting email and password from request body
        const { email, password } = req.body;
    
        // Validate input fields
        if (!email || !password) {
            return res.status(403).json({
            success: false,
            message: "All fields are required",
            });
        }
    
        // Check if user exists
        const existingUser = await User.findOne({ email }).populate("AdditionalDetails");
        if (!existingUser) {
            return res.status(401).json({
            success: false,
            message: "User not registered, please sign up first",
            });
        }
    
        // Verify password
        const isPasswordMatch = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
            success: false,
            message: "Incorrect password",
            });
        }
    
        // Generate JWT token
        const payload = {
            email: existingUser.email,
            id: existingUser._id,
            role: existingUser.role,
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2h" });
    
        // Save token in the user model (optional if not needed elsewhere)
        existingUser.token = token;
        await existingUser.save();
    
        // Remove sensitive data before sending response
        existingUser.password = undefined;

    
        // Create and send cookie
        const options = {
            expires: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours
            httpOnly: true, // Prevent access to the cookie from client-side scripts
        };
    
        res
            .cookie("token", token, options)
            .status(200)
            .json({
            success: true,
            token,
            existingUser,
            message: "Logged in successfully",
            });
    } catch (err) {
        console.error("Error in LogIN:", err);
        return res.status(500).json({
            success: false,
            message: "Login failed. Please try again later.",
        });
    }
  };

exports.LogOut = async (req, res) => {
    try {
        // Extract the user ID from the request
        const userid = req.user.id;

        // Find the user and unset the token in one operation
        const user = await User.findOneAndUpdate(
            { _id: userid }, // Match user by ID
            { $unset: { token: "" } }, // Clear the token field
            { new: true } // Return the updated document (optional)
        );

        // If no user is found
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found or already logged out.",
            });
        }

        // Clear the token from cookies
        res.clearCookie("token", {
            httpOnly: true,  // Ensure the cookie is inaccessible via client-side JavaScript
            secure: true,    // Ensure the cookie is only sent over HTTPS (adjust for development)
            sameSite: "strict", // Prevent CSRF
        });

        // Respond with success
        return res.status(200).json({
            success: true,
            message: "Logged out successfully.",
        });
    } catch (err) {
        console.error("Error during logout:", err);
        return res.status(500).json({
            success: false,
            message: "Something went wrong during logout.",
        });
    }
};




exports.changePassword = async (req, res) => {
    try {
        const {oldPassword, newPassword } = req.body;
        const userid = req.user.id

        // Validate request body
        if (!oldPassword || !newPassword) {
            return res.status(400).json({ 
                message: "All fields are required" 
            });
        }

        // Find the user by email
        const user = await User.findOne({_id:userid});
        if (!user) {
            return res.status(404).json({ 
                message: "User not found" 
            });
        }

        // Verify old password
        console.log()
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ 
                message: "Old password is incorrect" 
            });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the password in the database
        user.password = hashedPassword;
        await user.save();


        return res.status(200).json({ 
            success:true,
            message: "Password changed successfully" 
        });
    } 
    catch (error) {
        console.error("Error changing password:", error);
        return res.status(500).json({ 
            message: "Internal Server Error" 
        });
    }
};
