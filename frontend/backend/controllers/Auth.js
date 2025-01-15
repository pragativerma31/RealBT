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

exports.LogIN = async(req,res) =>{
    try{
        //data fetch
        const {
            password,
            email,
        } =req.body;
    
        //validate data
        if(!password || !email){
            return res.status(403).json({
                success:false,
                message:"All fields are required"
            })
        }
    
        //check if already exists
        const existingUser = await  User.findOne({email});
        if(!existingUser){
            return res.status(401).json({
                success: false,
                message:"User not registered , Sign up first"
            })
        }
        //generate jwt after password matching
        if(await bcrypt.compare(password , existingUser.password)){
            const payload ={
                email: existingUser.email,
                id: existingUser._id,
                role:existingUser.role,
            }
            const token  = jwt.sign(payload , process.env.JWT_SECRET ,{expiresIn:'2h'});
            existingUser.token = token;
            console.log(token);
            await existingUser.save();
            existingUser.password = undefined;
            

            //create cookie
            const options ={
                expiresIn : new Date(Date.now() + 2 * 60 * 60 * 1000),
                httpOnly: true,
            }
            res.cookie("token" ,token , options).status(200).json({
                success:true,
                token,
                existingUser,
                message:"Logged in successfully",
            })

        }
        else{
            return res.status(400).json({
                success: false,
                message:"Incorrect password"
            })
        }
    }
    catch(err){
        return res.status(400).json({
            success: false,
            message:"Login Failure"
        })

    }
         
}
exports.LogOut = async (req, res) => {
    try {
        // Extract the token from cookies
        const authHeader = req.headers.authorization;
        const token = authHeader?.startsWith("Bearer ") 
            ? authHeader.split(" ")[1] : req.cookies?.token;

        if (!token) {
            return res.status(400).json({
                success: false,
                message: "No active session found. Please log in first.",
            });
        }

        // Verify if the token exists in the database
        const user = await User.findOne({ token });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found or already logged out.",
            });
        }

        // Clear the token from the user's record in the database
        await User.updateOne({ _id: user._id }, { $unset: { token: "" } });

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
        const { email, oldPassword, newPassword } = req.body;

        // Validate request body
        if (!email || !oldPassword || !newPassword) {
            return res.status(400).json({ 
                message: "All fields are required" 
            });
        }

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ 
                message: "User not found" 
            });
        }

        // Verify old password
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

        await mailSender(user.email , "Password Changed Successfully")

        return res.status(200).json({ 
            message: "Password changed successfully and email sent" 
        });
    } 
    catch (error) {
        console.error("Error changing password:", error);
        return res.status(500).json({ 
            message: "Internal Server Error" 
        });
    }
};
