const LoanOffer = require('../models/LoanOffers');
const Property = require('../models/Property');
const User = require('../models/User');


exports.createLoanOffer = async (req, res) => {
    try {
        // 1. **Data Fetch**
        const { title, loanType, description, interestRate, tenureInMonths, maxLoanAmount, minLoanAmount, requiredDocuments, propertyId } = req.body;
        const userId  = req.user.id; 

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
            title,
            loanType,
            description,
            interestRate,
            tenureInMonths,
            maxLoanAmount,
            minLoanAmount, // Default value if not provided
            requiredDocuments,
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
