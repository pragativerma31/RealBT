const mongoose = require("mongoose");

const loanOfferSchema = new mongoose.Schema({
  BankerId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  title: {
    type: String,
    required: true,
  },
  loanType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "LoanTypes", // Assuming you have a User schema
    required: true
  },
  description: {
    type: String,
    required: true,
  },
  interestRate: {
    type: Number,
    required: true,
  },
  tenureInMonths: {
    type: Number,
    required: true,
  },
  maxLoanAmount: {
    type: Number,
    required: true,
  },
  minLoanAmount: {
    type: Number,
    default: 1000,
  },
  requiredDocuments: [
    {
      type: String, // Names of required documents (e.g., "ID Proof", "Income Certificate")
    },
  ],
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending"
  },
  uploadedDocuments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document",
    },
  ],
  propertyID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
    default: null, // If this offer is linked to a property
  },
  loanApplicationID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "LoanApplication",
    default: null, // If this offer is linked to a loan application
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("LoanOffer", loanOfferSchema);
