import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Footer from "../components/common/Footer";
import LoanApplication_Card from "../components/core/Dashboard/LoanApplicationcatalog/LoanApplicationCards";
import  apiConnector  from "../services/apiConnector";
import  {loanApplicationEndpoints}  from "../services/apis";

function LoanApplicationCatalog() {
  const { loading } = useSelector((state) => state.profile);
  const [loanApplications, setLoanApplications] = useState([]);

  // Fetch All Loan Applications
  useEffect(() => {
    (async () => {
      try {
        const res = await apiConnector("GET", loanApplicationEndpoints.GET_ALL_LOAN_APPLICATIONS_API);
        setLoanApplications(res?.data?.loanApplications || []);
      } catch (error) {
        console.log("Could not fetch loan applications.", error);
      }
    })();
  }, []);

  if (loading || loanApplications.length === 0) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <>
      <div className="box-content bg-richblack-700 px-4">
        <div className="mx-auto flex min-h-[160px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent">
          <p className="text-3xl text-richblack-5">All Loan Applications</p>
          <p className="max-w-[870px] text-richblack-200">
            Explore various loan applications available on our platform.
          </p>
        </div>
      </div>

      {/* Loan Applications Listing in Vertical Layout */}
      <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="flex flex-col gap-6 w-full items-center">
          {loanApplications.map((loanApplication, index) => (
            <LoanApplication_Card key={index} loanApplication={loanApplication} />
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default LoanApplicationCatalog;