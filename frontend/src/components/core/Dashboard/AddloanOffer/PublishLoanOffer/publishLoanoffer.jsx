import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast"; // ✅ Import toast for success message

import { setStep } from "../../../../../slices/loanOfferslice";
import IconBtn from "../../../../common/IconBtn";
import { resetLoanOfferState } from "../../../../../slices/loanOfferslice";

export default function PublishOffer() {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: {
      public: false, // ✅ Ensure default is unchecked
    },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loanOffer } = useSelector((state) => state.loanOffer);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loanOffer?.status ==="Pending" ) {
      setValue("public", true);
    }
  }, []);

  const goBack = () => {
    dispatch(setStep(1));
  };

  const onSubmit = (data) => {
    if (!data.public) {
      toast.error("You must accept that the Loan Application will be public.");
      return;
    }

    // ✅ Show toast for successful publish
    toast.success("Loan Offer published successfully!");

    // ✅ Update necessary attributes (Redux, reset state)
    dispatch(resetLoanOfferState());

    // ✅ Navigate to properties page
    navigate("/dashboard/my-loan-offers");
  };

  return (
    <div className="rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
      <p className="text-2xl font-semibold text-richblack-5">
        Publish Settings
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Checkbox */}
        <div className="my-6 mb-8">
          <label htmlFor="public" className="inline-flex items-center text-lg">
            <input
              type="checkbox"
              id="public"
              {...register("public", { required: "You must accept this property will be public." })}
              className="border-gray-300 h-4 w-4 rounded bg-richblack-500 text-richblack-400 focus:ring-2 focus:ring-richblack-5"
            />
            <span className="ml-2 text-richblack-400">
              Make this Offer public
            </span>
          </label>
          {errors.public && (
            <p className="text-richblue-100 text-sm mt-2">{errors.public.message}</p>
          )}
        </div>

        {/* Next Prev Button */}
        <div className="ml-auto flex max-w-max items-center gap-x-4">
          <button
            disabled={loading}
            type="button"
            onClick={goBack}
            className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900"
          >
            Back
          </button>
          <IconBtn disabled={loading} text="Save Changes" type="submit" />
        </div>
      </form>
    </div>
  );
}