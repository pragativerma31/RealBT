import { useEffect, useState } from "react";
import { VscAdd } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchLoanOffers } from "../../../../services/operations/LoanOfferAPI"; 
import IconBtn from "../../../common/IconBtn";
import LoanOfferTable from "./LoanOfferTable";

export default function MyLoanOffers() {
  const { token } = useSelector((state) => state.auth);
  const [loanOffers, setLoanOffers] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchLoanOffersData = async () => {
      try {
        const result = await fetchLoanOffers(token);
        console.log("Fetched Loan Offers......................:", result);
        if (result) {
          setLoanOffers(result);
        }
      } catch (error) {
        console.error("Error fetching loan offers:", error);
      }
    };
    fetchLoanOffersData();
  }, [token]); // ✅ Dependency array

  return (
    <div>
      <div className="mb-14 flex items-center justify-between">
        <h1 className="text-3xl font-medium text-richblack-5">My Loan Offers</h1>
        <IconBtn
          text="Add Loan Offer"
          onclick={() => navigate("/dashboard/add-loan-offer")}
        >
          <VscAdd />
        </IconBtn>
      </div>
      {loanOffers && <LoanOfferTable loanOffers={loanOffers} />}
    </div>
  );
}
