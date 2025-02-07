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

exports.fetchCustomersApplication = async (req, res) => {
    try {
        const Customer_Id = req.user.id; // Extract customer's ID from the request (Authenticated User)

        // Fetch all loan applications associated with the logged-in customer
        const loanApplications = await LoanApplication.find({ customer: Customer_Id }).populate("loanType", "name");
        console.log(loanApplications)
        // If no applications are found
        if (!loanApplications || loanApplications.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No loan applications found for this customer.",
            });
        }

        res.status(200).json({
            success: true,
            message: "Loan applications fetched successfully.",
            loanApplications,
        });

    } catch (error) {
        console.error("FETCH CUSTOMERS APPLICATION ERROR:", error);
        res.status(500).json({
            success: false,
            message: "Something went wrong while fetching customer's applications.",
        });
    }
};


exports.getAllLoanApplications = async (req, res) => {
  try {
    // Fetch all loan applications from the database
    const loanApplications = await LoanApplication.find().populate("customer loanType", "firstName lastName name");

    // Check if there are any loan applications
    if (!loanApplications.length) {
      return res.status(404).json({
        success: false,
        message: "No loan applications found",
      });
    }

    // Return the loan applications with a success response
    return res.status(200).json({
      success: true,
      loanApplications,
    });
  } catch (error) {
    console.error("Error fetching loan applications:", error);
    return res.status(500).json({
      success: false,
      message: "Server error, please try again later",
    });
  }
};



