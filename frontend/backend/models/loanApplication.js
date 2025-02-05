const mongoose = require("mongoose");

const LoanApplicationSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Assuming you have a User schema
        required: true
    },
    loanType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Loantypes", // Assuming you have a User schema
        required: true
    },
    loanAmount: {
        type: Number,
        required: true
    },
    interestRate: {
        type: Number,
        required: true
    },
    tenure: {
        type: Number, // in months or years
        required: true
    },
    purpose: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("LoanApplication", LoanApplicationSchema);
