import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { MdNavigateNext } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { addLoanOffer } from "../../../../../services/operations/LoanOfferAPI";
import IconBtn from "../../../../common/IconBtn";

export default function LoanOfferForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [loanTypes, setLoanTypes] = useState([]);

//   useEffect(() => {
//     const getLoanTypes = async () => {
//       setLoading(true);
//       const types = await fetchLoanTypes();
//       if (types.length > 0) {
//         setLoanTypes(types);
//       }
//       setLoading(false);
//     };
//     getLoanTypes();
//   }, []);

  const onSubmit = async (data) => {
    const formData = new FormData();
    
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    setLoading(true);
    try {
      const result = await addLoanOffer(formData, token);
      if (result) {
        toast.success("Loan offer added successfully");
        // Add any additional success handling here
      }
    } catch (error) {
      toast.error(error.message || "Failed to add loan offer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 h-full"
    >
      {/* Offer Title */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="title">
          Offer Title <sup className="text-pink-200">*</sup>
        </label>
        <input
          id="title"
          placeholder="Enter offer title"
          {...register("title", { required: true })}
          className="form-style w-full"
        />
        {errors.title && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Title is required
          </span>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="loanType">
          Loan Offer Type <sup className="text-pink-200">*</sup>
        </label>
        <input
          id="loanType"
          placeholder="Enter Loan Offer Type"
          {...register("loanType", { required: true })}
          className="form-style w-full"
        />
        {errors.title && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Loan Offer Type is required
          </span>
        )}
      </div>

      {/* Loan Type Selection */}
      {/* <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="loanType">
          Loan Type <sup className="text-pink-200">*</sup>
        </label>
        <select
          {...register("loanType", { required: true })}
          defaultValue=""
          className="form-style w-full"
        >
          <option value="" disabled>Choose a loan type</option>
          {loanTypes.map((type, index) => (
            <option key={index} value={type._id}>{type.name}</option>
          ))}
        </select>
        {errors.loanType && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Loan Type is required
          </span>
        )}
      </div> */}

      {/* Interest Rate */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="interestRate">
          Interest Rate (%) <sup className="text-pink-200">*</sup>
        </label>
        <input
          id="interestRate"
          placeholder="Enter interest rate"
          {...register("interestRate", { 
            required: true,
            valueAsNumber: true,
            pattern: {
              value: /^(0|[1-9]\d*)(\.\d+)?$/,
            }
          })}
          className="form-style w-full"
        />
        {errors.interestRate && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Valid interest rate is required
          </span>
        )}
      </div>

      {/* Tenure */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="tenureInMonths">
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
          className="form-style w-full"
        />
        {errors.tenureInMonths && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Valid tenure is required
          </span>
        )}
      </div>

      {/* Maximum Loan Amount */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="maxLoanAmount">
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
            className="form-style w-full !pl-12"
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
        <label className="text-sm text-richblack-5" htmlFor="requiredDocuments">
          Required Documents (comma-separated)
        </label>
        <input
          id="requiredDocuments"
          placeholder="Enter required documents"
          {...register("requiredDocuments")}
          className="form-style w-full"
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <IconBtn
          disabled={loading}
          text="Add Loan Offer"
          type="submit"
        >
          <MdNavigateNext />
        </IconBtn>
      </div>
    </form>
  );
}
