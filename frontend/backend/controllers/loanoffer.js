const LoanOffer = require('../models/LoanOffers');
const Property = require('../models/Property');
const User = require('../models/User');
const LoanApplication = require('../models/loanApplication')


exports.createLoanOfferForProperty = async (req, res) => {
    try {
        // 1. **Data Fetch**
        const { title, loanType, description, interestRate, tenureInMonths, maxLoanAmount, minLoanAmount, requiredDocuments, propertyId } = req.body;
        const userId  = req.user.id; 

        console.log(req.body);
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }


        // 2. **Data Validation**
        if (!title || !loanType || !description || !interestRate || !tenureInMonths || !maxLoanAmount || !propertyId) {
            return res.status(400).json({
                success: false,
                message: "Please fill in all the required fields.",
            });
        }

        // Validate that the property exists
        const property = await Property.findById(propertyId);
        if (!property) {
            return res.status(404).json({
                success: false,
                message: "Property not found.",
            });
        }

        // 3. **Create Loan Offer**
        const loanOffer = await LoanOffer.create({
            BankerId:userId,
            title,
            loanType,
            description,
            interestRate,
            tenureInMonths,
            maxLoanAmount,
            minLoanAmount, // Default value if not provided
            requiredDocuments,
            propertyID:propertyId
        });

        // 4. **Update Loan ID in Property and user**
        property.loanOffers.push(loanOffer._id);
        await property.save();

        user.loanOffers.push(loanOffer._id);
        await user.save();


        // 5. **Return Response**
        res.status(201).json({
            success: true,
            message: "Loan offer created successfully and linked to the property.",
            loanOffer,
        });
    } 
    catch (error) {
        console.error("Error creating loan offer:", error);
        res.status(500).json({
            success: false,
            message: "Something went wrong while creating the loan offer.",
        });
    }
};
exports.createLoanOfferForApplication = async (req, res) => {
    try {
        // 1. **Data Fetch**
        const { title, loanType, description, interestRate, tenureInMonths, maxLoanAmount, minLoanAmount, requiredDocuments, loanApplicationId } = req.body;
        const userId = req.user.id;

        // 2. **Find User**
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // 3. **Validate Required Fields**
        if (!title || !loanType || !description || !interestRate || !tenureInMonths || !maxLoanAmount || !loanApplicationId) {
            return res.status(400).json({
                success: false,
                message: "Please fill in all the required fields.",
            });
        }

        // 4. **Validate Loan Application**
        const loanApplication = await LoanApplication.findById(loanApplicationId);
        if (!loanApplication) {
            return res.status(404).json({
                success: false,
                message: "Loan application not found.",
            });
        }

        // 5. **Create Loan Offer**
        const loanOffer = await LoanOffer.create({
            BankerId:userId,
            title,
            loanType,
            description,
            interestRate,
            tenureInMonths,
            maxLoanAmount,
            minLoanAmount, // Default value if not provided
            requiredDocuments,
            loanApplicationID: loanApplicationId,
        });

        // 6. **Update Loan Offer ID in Loan Application & User**
        loanApplication.loanOffers.push(loanOffer._id);
        await loanApplication.save();

        user.loanOffers.push(loanOffer._id);
        await user.save();

        // 7. **Return Response**
        res.status(201).json({
            success: true,
            message: "Loan offer created successfully and linked to the loan application.",
            loanOffer,
        });
    } 
    catch (error) {
        console.error("Error creating loan offer for application:", error);
        res.status(500).json({
            success: false,
            message: "Something went wrong while creating the loan offer.",
        });
    }
};

exports.deleteLoanOffer = async (req, res) => {
    try {
        // 1. **Fetch Loan Offer ID from Request Parameters**
        const { loanOfferId } = req.params;

        // 2. **Find and Validate Loan Offer**
        const loanOffer = await LoanOffer.findById(loanOfferId);
        if (!loanOffer) {
            return res.status(404).json({
                success: false,
                message: "Loan offer not found.",
            });
        }

        // 3. **Remove Loan Offer ID from the Associated Property**
        await Property.updateOne(
            { loanOffers: loanOfferId }, // Find property with this loan offer
            { $pull: { loanOffers: loanOfferId } } // Remove loan offer ID from array
        );

        await User.updateOne(
            {loanOffers:loanOfferId},
            {$pull : {loanOffers:loanOfferId}}
        );

        // 4. **Delete the Loan Offer**
        await LoanOffer.findByIdAndDelete(loanOfferId);

        // 5. **Return Response**
        res.status(200).json({
            success: true,
            message: "Loan offer deleted successfully.",
        });
    } 
    catch (error) {
        console.error("Error deleting loan offer:", error);
        res.status(500).json({
            success: false,
            message: "Something went wrong while deleting the loan offer.",
        });
    }
};

exports.showAllLoanOffers = async (req, res) => {
    try {
        // Fetch all loan offers
        const loanOffers = await LoanOffer.find({});

        // Check if no loan offers exist
        if (loanOffers.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No loan offers found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "All loan offers retrieved successfully",
            loanOffers,
        });
    } 
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while fetching loan offers",
        });
    }
};



exports.getPropertyLoanOffers = async (req, res) => {
  try {
    const { propertyID } = req.params;

    if (!propertyID) {
      return res.status(400).json({
        success: false,
        message: "Property ID is required",
      });
    }

    const loanOffers = await LoanOffer.find({ propertyID });

    if (!loanOffers || loanOffers.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No loan offers found for this property",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Loan offers for the property retrieved successfully",
      loanOffers,
    });
  } catch (error) {
    console.error("Error fetching property loan offers:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


exports.getApplicationLoanOffers = async (req, res) => {
  try {
    const { loanApplicationID } = req.params;

    if (!loanApplicationID) {
      return res.status(400).json({
        success: false,
        message: "Loan Application ID is required",
      });
    }

    const loanOffers = await LoanOffer.find({ loanApplicationID });

    if (!loanOffers || loanOffers.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No loan offers found for this loan application",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Loan offers for the loan application retrieved successfully",
      loanOffers,
    });
  } catch (error) {
    console.error("Error fetching loan application loan offers:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Controller to fetch all bankers' offers
exports.getAllBankersOffer = async (req, res) => {
    try {
        // Fetching all bankers' offers from the database
        const {userId} = req.user.id
        const loanOffers = await LoanOffer.find({BankerId:userId}) // Populate 'bank' field if needed (adjust as necessary)

        // If no offers are found, return a 404 response
        if (!loanOffers || loanOffers.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No bankers' offers found"
            });
        }

        // Sending back the fetched offers
        return res.status(200).json({
            success: true,
            message: 'Bankers offers fetched successfully',
            loanOffers,
        });

    } catch (error) {
        console.error("Error fetching bankers offers:", error);
        
        // Send error response in case of failure
        return res.status(500).json({
            success: false,
            message: "Failed to fetch bankers offers",
            error: error.message
        });
    }
};
