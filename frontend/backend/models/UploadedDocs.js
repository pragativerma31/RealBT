const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer", // Reference to the customer who uploaded the document
      required: true,
    },
    loanOfferId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LoanOffer", // Reference to the loan offer for which the document is uploaded
      required: true,
    },
    documentName: {
      type: String, // Name of the document (e.g., "Aadhar Card")
      required: true,
    },
    fileUrl: {
      type: String, // URL or path of the uploaded file
      required: true,
    },
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
},
  { timestamps: true }
);

module.exports = mongoose.model("Document", documentSchema);
