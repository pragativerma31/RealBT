const profile = require('../models/Profile');
const User = require('../models/User');
const Property = require('../models/Property');
const LoanOffer = require('../models/LoanOffers');
const cloudinary = require('cloudinary').v2
const {uploadImgToCloudinary ,isFileTypeSupported , getnameFromURL } = require('../utils/cloudinaryUploads');


exports.updateProfile = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming userId is passed from the authentication middleware
        const { firstName, lastName, gender, dateOfBirth, about, contactNumber } = req.body;

        console.log(userId);

        // Validate required fields
        if (!gender || !dateOfBirth || !about || !contactNumber || !firstName || !lastName) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields: gender, dateOfBirth, about, contactNumber, firstName, lastName.",
            });
        }

        // Step 1: Find the user
        const user = await User.findById(userId).populate("AdditionalDetails");
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Step 2: Update firstName and lastName in the User collection
        user.firstName = firstName;
        user.lastName = lastName;
        user.imageURL = `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
        await user.save(); // Save the updated user

        // Step 3: Find the associated profile
        const profileId = user.AdditionalDetails;
        if (!profileId) {
            return res.status(404).json({
                success: false,
                message: "Profile not found for the user",
            });
        }

        // Step 4: Update the profile in the AdditionalDetails collection
        const updatedProfile = await profile.findByIdAndUpdate(
            profileId,
            { gender, dateOfBirth, about, contactNumber },
            { new: true } // Return the updated profile
        );

        // Step 5: Respond with the updated user and profile details
        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            updatedUserDetails: {
                ...user.toObject(),
                AdditionalDetails: updatedProfile,
            },
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while updating the profile",
        });
    }
};


exports.deleteUser = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming userId is passed as a URL parameter

        // Step 1: Fetch the user by ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Step 2: Handle based on user role
        if (user.role === "broker") {
            // Broker: Delete associated properties and loan offers
            // Delete all properties where the broker is associated
            const properties = await Property.find({ BrokerId: userId });
            for (let property of properties) {
                // Delete loan offers associated with the property
                await LoanOffer.deleteMany({ _id: { $in: property.loanOffers } });
                // Now delete the property
                await Property.findByIdAndDelete(property._id);
            }
        }

        // Step 3: If the user is a banker, delete their loan offers
        if (user.role === "banker") {
            // Delete all loan offers associated with the banker
            await LoanOffer.deleteMany({ _id: { $in: user.loanoffers } });
        }

        if (user.AdditionalDetails) {
            await profile.findByIdAndDelete(user.AdditionalDetails); // Delete the profile
        }

        // Step 4: Delete the user from the User model
        await User.findByIdAndDelete(userId);

        // Step 5: Respond with success
        return res.status(200).json({
            success: true,
            message: "Account and related data have been successfully deleted.",
        });
    } 
    catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while deleting the account.",
        });
    }
};

exports.getUserDetails = async (req, res) => {
    try {
        // Get user ID from request params (e.g., `/user/:id`)
        const id  = req.user.id;

        // Fetch the user by ID and populate 'AdditionalDetails' and 'loanoffers'
        const user = await User.findById(id)
            .populate('AdditionalDetails') // Populating the profile (AdditionalDetails)
            .populate('loanOffers')
            .populate('properties'); // Populating the loan offers

        // If user not found
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        // Respond with the user data
        res.status(200).json({
            success: true,
            data: user,
        });
    } 
    catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Something went wrong while fetching user details.",
        });
    }
};

exports.updateProfileImg = async(req,res) =>{
    try{
        const userid = req.user.id; // Assuming userId is retrieved from auth middleware


        // Check if a file is uploaded
        const file = req.files.displayPicture
        if (!file || !req.files ) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded",
            });
        }
        // Validate file type
        const supportedTypes = ['image/jpeg', 'image/png', 'image/webp'];
        if (!isFileTypeSupported(supportedTypes, file.mimetype)) {
            return res.status(400).json({
                success: false,
                message: `Unsupported file type. Supported types are: ${supportedTypes.join(', ')}`,
            });
        }

        // Find the user
        const user = await User.findById(userid).populate('AdditionalDetails');
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        if (user.imageURL) {
            // Extract public ID from the existing image URL
            console.log(user.imageURL);
            const extractedName = getnameFromURL(user.imageURL);
            console.log(extractedName);
            const publicId = `Profile Pictures/${extractedName}`;
            
            // Delete the old image from Cloudinary
            await cloudinary.uploader.destroy(publicId, function(error,result) {
                console.log(result, error) }) 
        }
        
        const result = await uploadImgToCloudinary(file.tempFilePath , "Profile Pictures");

        user.imageURL = result.secure_url;
        await user.save();

         // Respond with success
        return res.status(200).json({
            success: true,
            message: "Profile picture updated successfully",
            user:user, 
        });

    }
    catch(err){
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while updating the profile picture",
        });

    }
}