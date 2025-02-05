import { toast } from "react-hot-toast";
import apiConnector from "../apiConnector";
import { loanApplicationEndpoints, loanTypesEndpoints } from "../apis";

const { GET_LOAN_TYPES_API } = loanTypesEndpoints;
const { CREATE_LOAN_APPLICATION_API, EDIT_LOAN_APPLICATION_API } = loanApplicationEndpoints;

// Fetch Loan Types
export const fetchLoanTypes = async () => {
    let result = [];
    try {
        const response = await apiConnector("GET", GET_LOAN_TYPES_API);
        console.log("FETCH_LOAN_TYPES_API RESPONSE............", response);
        if (!response?.data?.success) {
            throw new Error("Could not fetch loan types");
        }
        result = response?.data?.loanTypes;
    } catch (error) {
        console.error("FETCH_LOAN_TYPES_API ERROR............", error);
        toast.error(error.message);
    }
    return result;
};

// Create Loan Application
export const addApplicationDetails = async (formData, token) => {
    let result = null;
    const toastId = toast.loading("Submitting Loan Application...");
    try {
        const response = await apiConnector("POST", CREATE_LOAN_APPLICATION_API, formData, {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        });
        console.log("CREATE_LOAN_APPLICATION_API RESPONSE............", response);
        if (!response?.data?.success) {
            throw new Error("Could not submit loan application");
        }
        toast.success("Loan Application Submitted Successfully");
        result = response?.data?.loanApplication;
    } catch (error) {
        console.error("CREATE_LOAN_APPLICATION_API ERROR............", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
};

// Edit Loan Application
export const editApplicationDetails = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Updating Loan Application...");
    try {
        const response = await apiConnector("PUT", EDIT_LOAN_APPLICATION_API, data, {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        });
        console.log("EDIT_LOAN_APPLICATION_API RESPONSE............", response);
        if (!response?.data?.success) {
            throw new Error("Could not update loan application");
        }
        toast.success("Loan Application Updated Successfully");
        result = response?.data?.loanApplication;
    } catch (error) {
        console.error("EDIT_LOAN_APPLICATION_API ERROR............", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
};


