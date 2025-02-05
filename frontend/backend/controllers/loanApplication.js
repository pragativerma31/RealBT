const LoanApplication = require('../models/loanApplication');
const User = require('../models/User');
const LoanTypes =  require('../models/loanTypes');

exports.createLoanApplication = async (req, res) => {
    try {
        const { loanType, loanAmount, interestRate, tenure, purpose,status } = req.body;
        const customerId = req.user.id

        // Check if the customer exists
        const customer = await User.findById(customerId);
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        // Check if the loan type exists
        const loanTypeExists = await LoanTypes.findOne({ _id: loanType });
        if (!loanTypeExists) {
            return res.status(400).json({ message: "Invalid loan type" });
        }

        // Create new loan application
        const newLoanApplication = new LoanApplication({
            customer: customerId,
            loanType,
            loanAmount,
            interestRate,
            tenure,
            purpose,
            status
        });

        // Save loan application
        await newLoanApplication.save();

        // Add loan application to the LoanTypes collection
        loanTypeExists.loanApplication.push(newLoanApplication._id);
        await loanTypeExists.save();

        customer.loanApplications.push(newLoanApplication._id);
        await customer.save();

        res.status(201).json({
            success:true,
            message: "Loan application created successfully",
            loanApplication: newLoanApplication
        });

    } catch (error) {
        console.error("Error creating loan application:", error);
        res.status(500).json({ 
            message: "Internal server error",
            success: true,
        });
    }
};



exports.editLoanApplication = async (req, res) => {
    try {
        const { loanApplicationId } = req.params;
        const updateData = req.body; // Fields to update

        // Find and update the loan application
        const updatedLoanApplication = await LoanApplication.findByIdAndUpdate(
            loanApplicationId,
            updateData,
            { new: true, runValidators: true } // Returns updated document & ensures validation
        );

        // If loan application is not found
        if (!updatedLoanApplication) {
            return res.status(404).json({ message: "Loan application not found" });
        }

        res.status(200).json({
            message: "Loan application updated successfully",
            loanApplication: updatedLoanApplication
        });

    } catch (error) {
        console.error("Error updating loan application:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


