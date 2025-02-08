
import { toast } from "react-hot-toast";
import apiConnector from "../apiConnector";
import { loanOffersEndpoints } from "../apis";

const { CREATE_LOAN_OFFER_API } = loanOffersEndpoints;

export const addLoanOffer = async (formData, token) => {
    let result = null;
    const toastId = toast.loading("Submitting Loan offer...");
    try {
        const response = await apiConnector("POST", CREATE_LOAN_OFFER_API, formData, {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        });
        console.log("CREATE_LOAN_OFFER_API RESPONSE..................", response);
        if (!response?.data?.success) {
            throw new Error("Could not submit loan offer");
        }
        toast.success("Loan Offer Submitted Successfully");
        result = response?.data?.loanOffer;
    } catch (error) {
        console.error("CREATE_LOAN_OFFER_API ERROR............", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
};

