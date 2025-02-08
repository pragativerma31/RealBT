import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, FileText, Upload, Eye, AlertTriangle } from "lucide-react";

function LoanOfferCard({ loanOffer, user, baseUrl }) {
  const navigate = useNavigate();
  const [showDocs, setShowDocs] = useState(false);
  
  const allDocsUploaded = loanOffer.uploadedDocuments.length === loanOffer.requiredDocuments.length;
  const someDocsMissing = loanOffer.uploadedDocuments.length > 0 && !allDocsUploaded;

  return (
    <div className="bg-richblack-800 rounded-xl shadow-md p-4 mb-4 min-w-[800px] max-w-5xl border-b-2 border-richblack-700">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-white font-bold text-lg">{loanOffer.loanType}</h2>
        <span className="px-3 py-1 rounded-md text-sm font-semibold flex items-center gap-2 bg-green-500 text-white">
          <CheckCircle className="w-5 h-5 text-white" />
          {loanOffer.title}
        </span>
      </div>

      {/* Loan Details */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="bg-yellow-400 text-richblack-900 flex items-center justify-center py-2 rounded-md font-bold border-b-4 border-yellow-600">
          Max Amount: Rs. {loanOffer.maxLoanAmount}
        </div>
        <div className="bg-richblue-300 text-richblack-900 flex items-center justify-center py-2 rounded-md font-semibold border-b-4 border-richblue-200">
          Interest Rate: {loanOffer.interestRate}%
        </div>
        <div className="bg-blue-400 text-richblack-900 flex items-center justify-center py-2 rounded-md font-semibold border-b-4 border-blue-300">
          Tenure: {loanOffer.tenureInMonths} months
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center gap-10 mt-4">
        <div className="flex gap-6">
          {/* View Details Button */}
          <button
            onClick={() => navigate(`${baseUrl}/${loanOffer._id}/details`)}
            className="bg-yellow-400 text-richblack-900 px-4 py-2 rounded-md font-semibold hover:bg-yellow-500 transition flex items-center gap-2"
          >
            <FileText className="w-5 h-5" />
            View Details
          </button>

          {/* Required Docs Button */}
          <button
            onClick={() => setShowDocs(!showDocs)}
            className="bg-gray-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-gray-400 transition flex items-center gap-2"
          >
            <Eye className="w-5 h-5" />
            Required Docs
          </button>

          {showDocs && (
            <div className="absolute bg-richblack-900 text-white p-4 rounded-md mt-2">
              <ul className="list-disc ml-5">
                {loanOffer.requiredDocuments.map((doc, index) => (
                  <li key={index}>{doc}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Uploaded Docs Button (if any uploaded) */}
          {loanOffer.uploadedDocuments.length > 0 && (
            <button
              onClick={() => navigate(`${baseUrl}/${loanOffer._id}/see-uploaded-docs`)}
              className="bg-green-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-green-400 transition flex items-center gap-2"
            >
              <Eye className="w-5 h-5" />
              See Uploaded Docs
            </button>
          )}

          {/* Upload Docs Button (Customer only) */}
          {user?.role === "customer" && (
            <button
              onClick={() => navigate(`${baseUrl}/${loanOffer._id}/upload-docs`)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-500 transition flex items-center gap-2"
            >
              <Upload className="w-5 h-5" />
              Upload Docs
            </button>
          )}

          {/* Warning if some docs are missing */}
          {someDocsMissing && (
            <span className="bg-red-500 text-white px-4 py-2 rounded-md font-semibold flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Some Docs Missing
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoanOfferCard;
