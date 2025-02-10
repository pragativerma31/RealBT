import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { MdNavigateNext } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { matchPath } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { addLoanOfferForLoanApplication,addLoanOfferForProperty} from "../../../../../services/operations/LoanOfferAPI";
import { fetchLoanTypes } from "../../../../../services/operations/LoanApplicationAPI";
import { setLoanOffer, setStep } from "../../../../../slices/loanOfferslice";
import IconBtn from "../../../../common/IconBtn";

export default function LoanOfferForm() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const {step} = useSelector((state) => state.loanOffer)
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { loanOffer, editLoanOffer } = useSelector((state) => state.loanOffer);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [LoanTypes, setLoanTypes] = useState([]);

  useEffect(() => {
    const getLoanCategories = async () => {
      setLoading(true);
      const loanTypes = await fetchLoanTypes();
      if (loanTypes.length > 0) {
        setLoanTypes(loanTypes);
      }
      setLoading(false);
    };

    if (editLoanOffer) {
      setValue("title", loanOffer.title);
      setValue("loanType", loanOffer.loanType._id);
      setValue("description", loanOffer.description);
      setValue("interestRate", loanOffer.interestRate);
      setValue("tenureInMonths", loanOffer.tenureInMonths);
      setValue("maxLoanAmount", loanOffer.maxLoanAmount);
      setValue("requiredDocuments", loanOffer.requiredDocuments);
    }
    getLoanCategories();
  }, []);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("loanType", data.loanType);
    formData.append("description", data.description);
    formData.append("interestRate", data.interestRate);
    formData.append("tenureInMonths", data.tenureInMonths);
    formData.append("maxLoanAmount", data.maxLoanAmount);

    // Convert requiredDocuments from string to an array
    const documentsArray = data.requiredDocuments.split(",").map((doc) => doc.trim());
    formData.append("requiredDocuments", JSON.stringify(documentsArray));
    
    // Extract propertyID or loanApplicationID from URL
    const propertyMatch = matchPath("/loanOffers/property/:propertyID/add-loan-offer", location.pathname);
    const loanApplicationMatch = matchPath("/loanOffers/loanapplication/:loanApplicationID/add-loan-offer", location.pathname);

    let result = null;
    
    setLoading(true);
    if (propertyMatch) {
        const propertyID = propertyMatch.params.propertyID;
        console.log("Submitting for property:", propertyID);
        formData.append("propertyId", propertyID);
        result = await addLoanOfferForProperty(formData, token);
    } else if (loanApplicationMatch) {
        const loanApplicationID = loanApplicationMatch.params.loanApplicationID;
        console.log("Submitting for loan application:", loanApplicationID);
        formData.append("loanApplicationId", loanApplicationID);
        result = await addLoanOfferForLoanApplication(formData, token);
    } else {
        toast.error("Invalid URL structure. Could not determine property or loan application.");
        setLoading(false);
        return;
    }
    
    setLoading(false);

    if (result) {
        dispatch(setStep(2));
        dispatch(setLoanOffer(result));
        toast.success("Loan Offer added successfully");
    } else {
        toast.error("Failed to add loan offer");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 h-full"
    >
      {/* Offer Title */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm " htmlFor="title">
          Offer Title <sup className="text-pink-200">*</sup>
        </label>
        <input
          id="title"
          placeholder="Enter offer title"
          {...register("title", { required: "Title is required" })}
          className="form-style w-full bg-richblack-700"
        />
        {errors.title && <span className="ml-2 text-xs tracking-wide text-pink-200">{errors.title.message}</span>}
      </div>

      {/* Loan Type */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm " htmlFor="loanType">
          Loan Type <sup className="text-pink-200">*</sup>
        </label>
        <select
          {...register("loanType", { required: "Loan Type is required" })}
          id="loanType"
          className="form-style w-full bg-richblack-700"
        >
          <option value="" disabled>
            Choose a loan Type
          </option>
          {!loading &&
            LoanTypes?.map((loanType) => (
              <option key={loanType._id} value={loanType._id}>
                {loanType.name}
              </option>
            ))}
        </select>
        {errors.loanType && <span className="ml-2 text-xs tracking-wide text-pink-200">{errors.loanType.message}</span>}
      </div>

      {/* Description */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm " htmlFor="description">
          Loan Offer Description <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="description"
          placeholder="Enter Description"
          {...register("description", { required: "Description is required" })}
          className="form-style min-h-[130px] w-full"
        />
        {errors.description && <span className="ml-2 text-xs tracking-wide text-pink-200">Description for the offer is required</span>}
      </div>

      {/* Interest Rate */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm " htmlFor="interestRate">
          Interest Rate (%) <sup className="text-pink-200">*</sup>
        </label>
        <input
          id="interestRate"
          type="number"
          step="0.01"
          {...register("interestRate", { required: "Interest rate is required", valueAsNumber: true })}
          className="form-style w-full bg-richblack-700"
        />
        {errors.interestRate && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Valid interest rate is required
          </span>
        )}
      </div>
      {/* Tenure */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm " htmlFor="tenureInMonths">
          Tenure (Months) <sup className="text-pink-200">*</sup>
        </label>
        <input
          id="tenureInMonths"
          placeholder="Enter tenure in months"
          {...register("tenureInMonths", { 
            required: true,
            valueAsNumber: true,
            min: 1
          })}
          className="form-style w-full bg-richblack-700"
        />
        {errors.tenureInMonths && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Valid tenure is required
          </span>
        )}
      </div>
      {/* Maximum Loan Amount */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm " htmlFor="maxLoanAmount">
          Maximum Loan Amount <sup className="text-pink-200">*</sup>
        </label>
        <div className="relative">
          <input
            id="maxLoanAmount"
            placeholder="Enter max loan amount"
            {...register("maxLoanAmount", { 
              required: true,
              valueAsNumber: true,
              pattern: {
                value: /^(0|[1-9]\d*)(\.\d+)?$/,
              }
            })}
            className="form-style w-full !pl-12 bg-richblack-700"
          />
          <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-richblack-400" />
        </div>
        {errors.maxLoanAmount && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Valid amount is required
          </span>
        )}
      </div>

      {/* Required Documents */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm " htmlFor="requiredDocuments">
          Required Documents <sup className="text-pink-200">*</sup>
        </label>
        <input
          id="requiredDocuments"
          placeholder="Enter required documents (comma-separated)"
          {...register("requiredDocuments", { required: "Required documents are mandatory" })}
          className="form-style w-full bg-richblack-700"
        />
        {errors.requiredDocuments && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">{errors.requiredDocuments.message}</span>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <IconBtn disabled={loading} text="Add Loan Offer" type="submit">
          <MdNavigateNext />
        </IconBtn>
      </div>
    </form>
  );
}
