const profile = require('../models/Profile');
const User = require('../models/User');
const Property = require('../models/Property');
const LoanOffer = require('../models/LoanOffers');
const uploadImgToCloudinary = require('../utils/cloudinaryUploads');
const isFileTypeSupported = require('../utils/cloudinaryUploads');


exports.updateProfile = async (req, res) => {
    try {
        const userId  = req.user.id; // Assuming userId is passed as a URL parameter
        const { gender, dateOfBirth, about, contactNumber } = req.body;
        console.log(userId);

        // Step 1: Find the user
        const user = await User.findById(userId).populate("AdditionalDetails");
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        if (!gender || !dateOfBirth || !about || !contactNumber) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields: gender, dateOfBirth, about, contactNumber.",
            });
        }

        // Step 2: Find the associated profile
        const profileId = user.AdditionalDetails;
        if (!profileId) {
            return res.status(404).json({
                success: false,
                message: "Profile not found for the user",
            });
        }

        // Step 3: Update the profile
        const updatedProfile = await profile.findByIdAndUpdate(
            profileId,
            { gender, dateOfBirth, about, contactNumber },
            { new: true } // Return the updated profile
        );

        // Step 4: Respond with the updated profile
        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            profile: updatedProfile,
        });
    } 
    catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while updating the profile",
        });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { userId } = req.params; // Assuming userId is passed as a URL parameter

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
        const { email } = req.body; // Assuming userId is retrieved from auth middleware

        // Check if a file is uploaded
        if (!req.files?.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded",
            });
        }
        // Validate file type
        const supportedTypes = ['jpeg', 'png', 'webp'];
        if (!isFileTypeSupported(supportedTypes, req.file.mimetype)) {
            return res.status(400).json({
                success: false,
                message: `Unsupported file type. Supported types are: ${supportedTypes.join(', ')}`,
            });
        }

        // Find the user
        const user = await User.findById({email:email});
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        const result = await uploadImgToCloudinary(req.file.path , "Profile Pictures");

        user.imageURL = result.secure_url;
        await user.save();

         // Respond with success
        return res.status(200).json({
            success: true,
            message: "Profile picture updated successfully",
            imageURL: result.secure_url,
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