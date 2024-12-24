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
                message:"user already registered , Try Login in"
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
            success:false.valueOf,
            message:"Error in otp generation"
        })
    }
}

//signup
exports.signUP = async(req,res) =>{
    try{
        //data fetch
        const {
            firstName,
            lastName,
            password,
            Confirmpassword,
            email,
            otp,
            role
        } =req.body;
    
        //validate data
        if(!firstName || !lastName || !password || !Confirmpassword || !email){
            return res.status(403).json({
                success:false,
                message:"All fields are required"
            })
        }
    
        if(password !== Confirmpassword){
            return res.status(400).json({
                success:false,
                message:"password and confirm password do not match"
            })
        }
    
        //check if already exists
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(401).json({
                success: false,
                message:"user already registered , Try Login in"
            })
        }
    
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
            password,
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

        return res.status(200).json({
            success: true,
            message:"User Created Successfully"
        })
    }
    catch(err){
        return res.status(400).json({
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
                message:"user not registered , Sign up first"
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
            existingUser.password = undefined;

            //create cookie
            const options ={
                expiresIn : new Date(Date.now() + 3*24*60*60*1000),
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
        // Check if the user is logged in by verifying the JWT token
        const token = req.cookies.token;

        if (!token) {
            return res.status(400).json({
                success: false,
                message: "No active session found. Please log in first.",
            });
        }

        // Clear the token from the user's document in the database (optional)
        const user = await User.findOneAndUpdate(
            { token: token }, 
            { token: null },  // Remove the token from the user's document
            { new: true }
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        // Clear the cookie holding the token
        res.clearCookie('token'); // Clearing the token from cookies

        // Respond with success
        res.status(200).json({
            success: true,
            message: "Logged out successfully",
        });
    } 
    catch (err) {
        console.error("Error during logout:", err);
        res.status(500).json({
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
