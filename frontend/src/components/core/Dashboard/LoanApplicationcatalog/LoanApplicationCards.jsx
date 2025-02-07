import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Clock, CalendarClock, FileText, CheckCircle, XCircle } from "lucide-react";

function LoanApplication_Card({ loanApplication }) {
  const navigate = useNavigate();
  console.log(loanApplication)
  console.log(loanApplication?.loanType?.name)
  // Handle button clicks with navigation
  const handleNavigation = (e, path) => {
    e.preventDefault();
    navigate(path);
  };

  return (
    <div className="bg-richblack-800 rounded-xl shadow-md p-4 mb-4 min-w-[1400px] max-w-5xl  border-b-2 border-b-richblack-700">
      {/* Loan Application Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-white font-bold text-lg"> {loanApplication?.loanType?.name} </h2>
        {/* Status Icons */}
        <span
        className={`px-3 py-1 rounded-md text-sm font-semibold flex items-center gap-2 ${
            loanApplication.status === "Approved"
            ? "bg-green-500 text-white"
            : loanApplication.status === "Pending"
            ? "bg-yellow-500 text-black"
            : "bg-gray-500 text-white"
        }`}
        >
        {loanApplication.status}

        {loanApplication.status === "Approved" && (
            <CheckCircle className="w-5 h-5 text-white" />
        )}
        {loanApplication.status === "Pending" && (
            <Clock className="w-5 h-5 text-black" />
        )}
        </span>
      </div>

      {/* Details Section */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="bg-yellow-400 text-richblack-900 flex items-center justify-center py-2 rounded-md font-bold border-b-4 border-yellow-600 transition hover:bg-yellow-500">
          Rs. {loanApplication?.loanAmount}
        </div>
        <div className="bg-richblue-300 text-richblack-900 flex items-center justify-center py-2 rounded-md font-semibold border-b-4 border-richblue-200 transition hover:bg-richblue-400">
          Interest Rate: {loanApplication?.interestRate}%
        </div>
        <div className="bg-blue-400 text-richblack-900 flex items-center justify-center py-2 rounded-md font-semibold border-b-4 border-blue-300 transition hover:bg-blue-500">
          Tenure: {loanApplication?.tenure} months
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center gap-10 mt-4">
        <div className="flex gap-6">
          <button
            onClick={(e) => handleNavigation(e, `/loan-applications/${loanApplication._id}/details`)}
            className="bg-yellow-400 text-richblack-900 px-4 py-2 rounded-md font-semibold hover:bg-yellow-500 transition flex items-center gap-2"
          >
            <FileText className="w-5 h-5" />
            View Details
          </button>

          <button
            onClick={(e) => handleNavigation(e, `/loan-applications/${loanApplication._id}/schedule-meeting`)}
            className="bg-green-500 text-richblack-900 px-4 py-2 rounded-md font-semibold hover:bg-green-400 transition flex items-center gap-2"
          >
            <CalendarClock className="w-5 h-5" />
            Schedule Meeting
          </button>
        </div>

        
      </div>
    </div>
  );
}

export default LoanApplication_Card;
