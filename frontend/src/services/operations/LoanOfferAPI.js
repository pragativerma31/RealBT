
import { toast } from "react-hot-toast";
import apiConnector from "../apiConnector";
import { loanOffersEndpoints } from "../apis";

const { CREATE_LOAN_OFFER_FOR_PROPERTY , CREATE_LOAN_OFFER_FOR_APPLICATION ,FETCH_BANKERS_LOAN_OFFERS_API} = loanOffersEndpoints;

export const addLoanOfferForProperty = async (formData, token) => {
    let result = null;
    const toastId = toast.loading("Submitting Loan offer...");
    try {
        const response = await apiConnector("POST", CREATE_LOAN_OFFER_FOR_PROPERTY, formData, {
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
export const addLoanOfferForLoanApplication = async (formData, token) => {
    let result = null;
    const toastId = toast.loading("Submitting Loan offer...");
    try {
        const response = await apiConnector("POST", CREATE_LOAN_OFFER_FOR_APPLICATION, formData, {
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


export const fetchLoanOffers = async (token) => {
    let result = null;
    const toastId = toast.loading("Fetching Loan Offers...");
    
    try {
        const response = await apiConnector("GET", FETCH_BANKERS_LOAN_OFFERS_API, null, {
            Authorization: `Bearer ${token}`,
        });

        console.log("FETCH_LOAN_OFFERS RESPONSE:", response);

        if (!response?.data?.success) {
            throw new Error("Could not fetch loan offers");
        }

        result = response?.data?.loanOffers; // ✅ Extract loan offers
        toast.success("Loan Offers Fetched Successfully");
    } catch (error) {
        console.error("FETCH_LOAN_OFFERS ERROR:", error);
        toast.error(error.message || "Failed to fetch loan offers");
    }

    toast.dismiss(toastId);
    return result;
};

