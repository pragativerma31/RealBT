import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import apiConnector from "../services/apiConnector";
import { loanOffersEndpoints } from "../services/apis";
import Footer from "../components/common/Footer";
import LoanOfferCard from "../components/core/Dashboard/loanOffersCatalog/LoanoffersCards";
import IconBtn from "../components/common/IconBtn";
import { VscAdd } from "react-icons/vsc";

function LoanOffersCatalog() {
  const { propertyID, loanApplicationID } = useParams();
  const location = useLocation();
  const { user } = useSelector((state) => state.profile);
  const [loanOffers, setLoanOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch Loan Offers for Property or Loan Application
  const fetchLoanOffers = async () => {
    try {
      let res;
      if (propertyID) {
        res = await apiConnector(
          "GET",
          `${loanOffersEndpoints.FETCH_PROPERTY_LOAN_OFFERS_API}/${propertyID}`
        );
      } else if (loanApplicationID) {
        res = await apiConnector(
          "GET",
          `${loanOffersEndpoints.FETCH_APPLICATION_LOAN_OFFERS_API}/${loanApplicationID}`
        );
      }

      setLoanOffers(res?.data?.loanOffers || []);
    } catch (error) {
      console.log("Could not fetch loan offers.", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoanOffers();
  }, [propertyID, loanApplicationID]);

  const handleAddLoanOffer = () => {
    if (propertyID) {
      navigate(`/loanOffers/property/${propertyID}/add-loan-offer`);
    } else if (loanApplicationID) {
      navigate(`/loanOffers/loanapplication/${loanApplicationID}/add-loan-offer`);
    }
  };

  if (loading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <>
      {/* Page Header */}
      <div className="box-content bg-richblack-700 px-4">
        <div className="mx-auto flex min-h-[160px] max-w-maxContentTab items-center justify-between gap-4 lg:max-w-maxContent">
          <div>
            <p className="text-3xl text-richblack-5">Loan Offers</p>
            <p className="max-w-[870px] text-richblack-200">
              Explore available loan offers for your selected {propertyID ? "property" : "loan application"}.
            </p>
          </div>

          {/* Only show "Add Loan Offer" button for Bankers */}
          {user?.role === "Banker" && (
            <IconBtn text="Add Loan Offer" onclick={handleAddLoanOffer}>
              <VscAdd />
            </IconBtn>
          )}
        </div>
      </div>

      {/* Loan Offers List */}
      <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="flex flex-col gap-6 w-full items-center">
          {loanOffers.length === 0 ? (
            <p className="text-center text-richblack-200">No loan offers available.</p>
          ) : (
            loanOffers.map((offer, index) => (
              <LoanOfferCard key={index} loanOffer={offer} user={user} baseUrl={location.pathname} />
            ))
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default LoanOffersCatalog;

