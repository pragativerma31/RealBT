
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { HiOutlineCurrencyRupee } from "react-icons/hi"
import { MdNavigateNext } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"

import {
  addApplicationDetails,
  editApplicationDetails,
  fetchLoanTypes
} from "../../../../../services/operations/LoanApplicationAPI"
import { setLoanApplication, setStep } from "../../../../../slices/loanApplicationSlice"
import IconBtn from "../../../../common/IconBtn"

export default function ApplicationInformationForm() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm()

  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const { loanApplication, editLoanApplication } = useSelector((state) => state.loanApplication)
  const [loading, setLoading] = useState(false)
  const [LoanTypes, setloanType] = useState([])

  useEffect(() => {
    const getloanTypes = async () => {
      setLoading(true)
      const loanTypes = await fetchLoanTypes()
      if (loanTypes.length > 0) {
        // console.log("categories", categories)
        setloanType(loanTypes)
      }
      setLoading(false)
    }
    // if form is in edit mode
    console.log(editLoanApplication)
    if (editLoanApplication) {
      // console.log("data populated", editCourse)
      setValue("ApplicationType", loanApplication.loanType)
      setValue("ApplicationAmount", loanApplication.loanAmount)
      setValue("ApplicationTenure", loanApplication.tenure)
      setValue("ApplicationinterestRate", loanApplication.interestRate)
      setValue("ApplicationPurpose", loanApplication.purpose)
      setValue("ApplicationStatus", loanApplication.status)
    }
    getloanTypes()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const isFormUpdated = () => {
    const currentValues = getValues()
    // console.log("changes after editing form values:", currentValues)
    if (
      currentValues.ApplicationType._id !== loanApplication.loanType._id ||
      currentValues.ApplicationAmount !== loanApplication.loanAmount ||
      currentValues.ApplicationTenure !== loanApplication.tenure ||
      currentValues.ApplicationinterestRate !== loanApplication.interestRate ||
      currentValues.ApplicationPurpose !== loanApplication.purpose ||
      currentValues.ApplicationStatus!== loanApplication.status 
    ) {
      return true
    }
    return false
  }

  //   handle next button click
  const onSubmit = async (data) => {
    // console.log(data)

    if (editLoanApplication) {
      // const currentValues = getValues()
      // console.log("changes after editing form values:", currentValues)
      // console.log("now course:", course)
      // console.log("Has Form Changed:", isFormUpdated())
      if (isFormUpdated()) {
        const currentValues = getValues()
        const formData = new FormData()
        // console.log(data)
        if (currentValues.ApplicationType._id !== loanApplication.loanType._id) {
          formData.append("loanType", data.ApplicationType)
        }
        if (currentValues.ApplicationAmount !== loanApplication.loanAmount ) {
          formData.append("loanAmount", data.ApplicationAmount)
        }
        if (currentValues.ApplicationTenure !== loanApplication.tenure ) {
          formData.append("tenure", data.ApplicationTenure)
        }
        if (currentValues.ApplicationinterestRate !== loanApplication.interestRate) {
          formData.append("interestRate", data.ApplicationinterestRate)
        }
        if (currentValues.ApplicationPurpose !== loanApplication.purpose ) {
          formData.append("purposse", data.ApplicationPurpose)
        }
        if (currentValues.ApplicationStatus!== loanApplication.status ) {
          formData.append("status", data.ApplicationStatus)
        }
        // console.log("Edit Form data: ", formData)
        setLoading(true)
        const result = await editApplicationDetails(formData, token)
        setLoading(false)
        if (result) {
          dispatch(setStep(2))
          dispatch(setLoanApplication(result))
        }
      } else {
        toast.error("No changes made to the form")
      }
      return
    }

    const formData = new FormData()
    formData.append("loanType", data.ApplicationType)
    formData.append("loanAmount", data.ApplicationAmount)
    formData.append("tenure", data.ApplicationTenure)
    formData.append("purpose", data.ApplicationPurpose)
    formData.append("interestRate", data.ApplicationinterestRate)
    formData.append("status", "Pending")
    setLoading(true)

    const result = await addApplicationDetails(formData, token)
    if (result) {
      dispatch(setStep(2))
      dispatch(setLoanApplication(result))
    }
    setLoading(false)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 h-full"
    >
        {/* Loan Application Type */}
        <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="ApplicationType">
          Loan Type <sup className="text-pink-200">*</sup>
        </label>
        <select
          {...register("ApplicationType", { required: true })}
          defaultValue=""
          id="ApplicationType"
          className="form-style w-full"
        >
          <option value="" disabled>
            Choose a loan Type
          </option>
          {!loading &&
            LoanTypes?.map((loanType, indx) => (
              <option key={indx} value={loanType?._id}>
                {loanType?.name}
              </option>
            ))}
        </select>
        {errors.ApplicationType && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Loan Type is required
          </span>
        )}
      </div>
       {/* Loan Application Purpose */}
        <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="ApplicationPurpose">
        Application Purpose <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="ApplicationPurpose"
          placeholder="Enter Purpose"
          {...register("ApplicationPurpose", { required: true })}
          className="form-style resize-x-none min-h-[130px] w-full"
        />
        {errors.ApplicationPurpose && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Application Purpose is required
          </span>
        )}
      </div>
      {/* Loan Application Tenure */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="ApplicationTenure">
          Tenure <sup className="text-pink-200">*</sup>
        </label>
        <input
          id="ApplicationTenure"
          placeholder="Enter Tenure"
          {...register("ApplicationTenure", { required: true })}
          className="form-style w-full"
        />
        {errors.ApplicationTenure && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Tenure is required
          </span>
        )}
      </div>
      {/* Loan Application Interest Rate */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="ApplicationinterestRate">
          Required Interest Rate <sup className="text-pink-200">*</sup>
        </label>
        <input
          id="ApplicationinterestRate"
          placeholder="Enter Interest Rate"
          {...register("ApplicationinterestRate", { required: true })}
          className="form-style w-full"
        />
        {errors.ApplicationinterestRate && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Interest Rate is required
          </span>
        )}
      </div>
      {/* loan Application Amount */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="ApplicationAmount">
          Loan Amount <sup className="text-pink-200">*</sup>
        </label>
        <div className="relative">
          <input
            id="ApplicationAmount"
            placeholder="Enter Loan Amount"
            {...register("ApplicationAmount", {
              required: true,
              valueAsNumber: true,
              pattern: {
                value: /^(0|[1-9]\d*)(\.\d+)?$/,
              },
            })}
            className="form-style w-full !pl-12"
          />
          <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-richblack-400" />
        </div>
        {errors.ApplicationAmount && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Loan Amount is required
          </span>
        )}
      </div>
      {/* Next Button */}
      <div className="flex justify-end gap-x-2">
        {editLoanApplication && (
          <button
            onClick={() => dispatch(setStep(2))}
            disabled={loading}
            className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
          >
            Continue Without Saving
          </button>
        )}
        <IconBtn
          disabled={loading}
          text={!editLoanApplication ? "Next" : "Save Changes"}
        >
          <MdNavigateNext />
        </IconBtn>
      </div>
    </form>
  )
}
