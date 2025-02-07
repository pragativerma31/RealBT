
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { HiOutlineCurrencyRupee } from "react-icons/hi"
import { MdNavigateNext } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"

import {
  addPropertyDetails,
  editPropertyDetails,
  fetchPropertyCategories,
} from "../../../../../services/operations/propertyAPI"
import { setProperty, setStep } from "../../../../../slices/PropertySlice"
import { PROPERTY_STATUS } from "../../../../../utils/constants"
import IconBtn from "../../../../common/IconBtn"
import Upload from "../Upload"
import ChipInput from "./ChipInput"

export default function PropertyInformationForm() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm()

  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const { property, editProperty } = useSelector((state) => state.property)
  const [loading, setLoading] = useState(false)
  const [propertyCategories, setPropertyCategories] = useState([])

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true)
      const categories = await fetchPropertyCategories()
      if (categories.length > 0) {
        // console.log("categories", categories)
        setPropertyCategories(categories)
      }
      setLoading(false)
    }
    // if form is in edit mode
    console.log(editProperty)
    if (editProperty) {
      // console.log("data populated", editCourse)
      setValue("propertyTitle", property.title)
      setValue("propertyShortDesc", property.description)
      setValue("propertyPrice", property.price)
      setValue("propertyTags", property.tags)
      setValue("propertyAmenities", property.amenities)
      setValue("propertyCategory", property.category)
      setValue("propertyImage", property.thumbnailImage)
      setValue("propertyAddress", property.propertylocation)
    }
    getCategories()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const isFormUpdated = () => {
    const currentValues = getValues()
    // console.log("changes after editing form values:", currentValues)
    if (
      currentValues.propertyTitle !== property.title ||
      currentValues.propertyShortDesc !== property.description ||
      currentValues.propertyPrice !== property.price ||
      currentValues.propertyTags.toString() !== property.tags.toString() ||
      currentValues.propertyAmenities !== property.amenities ||
      currentValues.propertyCategory._id !== property.category._id ||
      currentValues.propertyImage[0] !== property.thumbnailImage ||
      currentValues.propertyAddress !== property.location
    ) {
      return true
    }
    return false
  }

  //   handle next button click
  const onSubmit = async (data) => {
    // console.log(data)

    if (editProperty) {
      // const currentValues = getValues()
      // console.log("changes after editing form values:", currentValues)
      // console.log("now course:", course)
      // console.log("Has Form Changed:", isFormUpdated())
      if (isFormUpdated()) {
        const currentValues = getValues()
        const formData = new FormData()
        // console.log(data)
        formData.append("propertyId", property._id)
        if (currentValues.propertyTitle !== property.title) {
          formData.append("title", data.propertyTitle)
        }
        if (currentValues.propertyShortDesc !== property.description) {
          formData.append("description", data.propertyShortDesc)
        }
        if (currentValues.propertyPrice !== property.price) {
          formData.append("price", data.propertyPrice)
        }
        if (currentValues.propertyTags.toString() !== property.tag.toString()) {
          formData.append("tags", JSON.stringify(data.propertyTags))
        }
        if (currentValues.propertyAmenities !== property.amenities) {
          formData.append("amenities", data.propertyAmenities)
        }
        if (currentValues.propertyCategory._id !== property.category._id) {
          formData.append("category", data.propertyCategory)
        }
        if (currentValues.propertyImage[0] !== property.thumbnailImage) {
          formData.append("thumbnailImage", data.propertyImage[0])
        }
        if (currentValues.propertyAddress !== property.location) {
          formData.append("location", data.propertyAddress)
        }
        // console.log("Edit Form data: ", formData)
        setLoading(true)
        const result = await editPropertyDetails(formData, token)
        setLoading(false)
        if (result) {
          dispatch(setStep(2))
          dispatch(setProperty(result))
        }
      } else {
        toast.error("No changes made to the form")
      }
      return
    }

    const formData = new FormData()
    formData.append("title", data.propertyTitle)
    formData.append("description", data.propertyShortDesc)
    formData.append("price", data.propertyPrice)
    formData.append("tags", JSON.stringify(data.propertyTags))
    formData.append("amenities", data.propertyAmenities)
    formData.append("category", data.propertyCategory)
    formData.append("status", PROPERTY_STATUS.DRAFT)
    formData.append("thumbnailImage", data.propertyImage[0])
    formData.append("location", data.propertyAddress)
    setLoading(true)

    const result = await addPropertyDetails(formData, token)
    if (result) {
      dispatch(setStep(2))
      dispatch(setProperty(result))
    }
    setLoading(false)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 h-full"
    >
      {/* Property Title */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm " htmlFor="propertyTitle">
          Property Title <sup className="text-pink-200">*</sup>
        </label>
        <input
          id="propertyTitle"
          placeholder="Enter Property Title"
          {...register("propertyTitle", { required: true })}
          className="form-style w-full bg-richblack-700"
        />
        {errors.propertyTitle && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Property title is required
          </span>
        )}
      </div>
      {/* Property Short Description */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm " htmlFor="propertyShortDesc">
          Property Short Description <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="propertyShortDesc"
          placeholder="Enter Description"
          {...register("propertyShortDesc", { required: true })}
          className="form-style resize-x-none min-h-[130px] w-full"
        />
        {errors.propertyShortDesc && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Property Description is required
          </span>
        )}
      </div>
      {/* Property Address */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm " htmlFor="propertyAddress">
          Property's Address <sup className="text-pink-200">*</sup>
        </label>
        <input
          id="propertyAddress"
          placeholder="Enter Property Address"
          {...register("propertyAddress", { required: true })}
          className="form-style w-full bg-richblack-700 text-white border border-richblack-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        {errors.propertyAddress && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Property Address is required
          </span>
        )}
      </div>
      {/* Property Price */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm " htmlFor="propertyPrice">
          Property Price <sup className="text-pink-200">*</sup>
        </label>
        <div className="relative">
          <input
            id="propertyPrice"
            placeholder="Enter Property Price"
            {...register("propertyPrice", {
              required: true,
              valueAsNumber: true,
              pattern: {
                value: /^(0|[1-9]\d*)(\.\d+)?$/,
              },
            })}
            className="form-style w-full !pl-12 bg-richblack-700 text-white border border-richblack-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-richblack-400" />
        </div>
        {errors.propertyPrice && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Property Price is required
          </span>
        )}
      </div>
      {/* Property Category */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm" htmlFor="propertyCategory">
          Property Category <sup className="text-pink-200">*</sup>
        </label>
        <select
          {...register("propertyCategory", { required: true })}
          defaultValue=""
          id="propertyCategory"
          className="form-style w-full bg-richblack-700 text-white border border-richblack-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        >
          <option value="" disabled>
            Choose a Category
          </option>
          {!loading &&
            propertyCategories?.map((category, indx) => (
              <option key={indx} value={category?._id}>
                {category?.name}
              </option>
            ))}
        </select>
        {errors.propertyCategory && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Property Category is required
          </span>
        )}
      </div>
      {/* Property Tags */}
      <ChipInput
        label="Tags"
        name="propertyTags"
        placeholder="Enter Tags and press Enter"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />
      {/* Property Thumbnail Image */}
      <Upload
        name="propertyImage"
        label="Property Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editProperty ?property?.thumbnailImage : null}
      />
      {/* Amenities of the Property */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm " htmlFor="propertyAmenities">
          Property's amenities  <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="propertyAmenities"
          placeholder="Enter Amenities of the property"
          {...register("propertyAmenities", { required: true })}
          className="form-style resize-x-none min-h-[130px] w-full"
        />
        {errors.propertyAmenities && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Property's amenities are required
          </span>
        )}
      </div>
      
      {/* Next Button */}
      <div className="flex justify-end gap-x-2">
        {editProperty && (
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
          text={!editProperty ? "Next" : "Save Changes"}
        >
          <MdNavigateNext />
        </IconBtn>
      </div>
    </form>
  )
}
