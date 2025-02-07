import { useEffect } from "react";
import { VscAdd } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { fetchCustomerApplication } from "../../../../services/operations/LoanApplicationAPI"; 
import IconBtn from "../../../common/IconBtn";
import LoanApplicationTable from "./LoanApplicationTable";


export default function MyLoanApplication() {
  const { token } = useSelector((state) => state.auth);
  const [loanApplications ,setloanApplications ] = useState([])
  const navigate = useNavigate();
  const dispatch  = useDispatch();

  useEffect(() => {
    const fetchloanApplication = async () => {
      try {
        const result = await dispatch(fetchCustomerApplication(token));
        console.log("Fetched loan application...............................:", result);
        if (result) {
          setloanApplications(result);  // ✅ No error now
        }
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };
    fetchloanApplication();
  },[token]);  // ✅ Added dependencies

  return (
    <div>
      <div className="mb-14 flex items-center justify-between">
        <h1 className="text-3xl font-medium text-richblack-5">My Loan Applications</h1>
        <IconBtn
          text="Add Loan Application"
          onclick={() => navigate("/dashboard/add-loan-application")}
        >
          <VscAdd />
        </IconBtn>
      </div>
      {loanApplications &&  <LoanApplicationTable loanApplications={loanApplications} />}
    </div>
  );
}