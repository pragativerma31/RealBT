
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

import {setStep,setCourse} from "../../../../slices/courseSlice";
import IconBtn from "../../../common/IconBtn";
// import { fetchCourseCategories } from "../../../../services/operations/courseAPI";
import {COURSE_STATUS} from "../../../../utils/constants"
// import { createCourse, editCourseDetails } from "../../../../services/operations/courseAPI";

import { useState } from "react";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import toast from "react-hot-toast";

const PropertyInfoForm = () => {
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
    } = useForm();
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
    const { property, editProperty } = useSelector((state) => state.property);
    const [loading, setLoading] = useState(false);
    const [propertyCategories, setpropertyCategories] = useState([]);

    useEffect(() => {
        const getCateories = async () => {
            setLoading(true);
            const categories = await fetchCourseCategories();
            if (categories.length > 0) {
                setpropertyCategories(categories);
            }
            setLoading(false);
        }
        if (editProperty) {
            setValue("title", course.title);
            setValue("tags", course.courseTag);
            setValue("description", course.description);
            setValue("price", course.price);
            setValue("category", course.category);
            setValue("thumbnail", course.thumbnail);
        }
        getCateories();
    }, [])

    const isFormUpdated = () => {
        const currentValues = getValues();
        if (currentValues.title !== course.title ||
            currentValues.tags !== course.tags ||
            currentValues.description !== course.description ||
            currentValues.price !== course.price ||
            currentValues.category !== course.category ||
            currentValues.thumbnail !== course.thumbnail
        ) {
            return true;
        }
        else {
            return false;
        }
    }

    const onSubmit = async (data) => {
        if (editCourse) {
            if (isFormUpdated()) {
                const currentValues = getValues();
                const formData = new FormData();
                formData.append("courseID", course._id);
                if (currentValues.title !== course.title) {
                    formData.append("title", data.title);
                }
                if (currentValues.tags !== course.tags) {
                    formData.append("tags", data.tags);
                }
                if (currentValues.description !== course.description) {
                    formData.append("description", data.description);
                }
                if (currentValues.price !== course.price) {
                    formData.append("price", data.price);
                }
                if (currentValues.category._id !== course.category._id) {
                    formData.append("category", data.category);
                }
                if (currentValues.thumbnail !== course.thumbnail) {
                    formData.append("thumbnail", data.thumbnail[0]);
                }
                setLoading(true);
                const result = await editCourseDetails(formData, token);
                setLoading(false);
                if (result) {
                    setStep(2);
                    dispatch(setCourse(result));
                }
            }
            else{
                toast.error("No changes made to the details");
            }
            return;
        }
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("tags", data.tags);
        formData.append("description", data.description);
        formData.append("price", data.price);
        formData.append("category", data.category);
        formData.append("thumbnail", data.thumbnail[0]);
        formData.append("status",COURSE_STATUS.DRAFT);

        setLoading(true);
        const result = await createCourse(formData, token);
        if(result){
            setStep(2);
            dispatch(setCourse(result));
        }
        setLoading(false);


    }

    return (
        <form onSubmit={handleSubmit()}
            className="rounded-md border-richblack-700 bg-richblack-800 p-6 space-y-8">
            <div>
                <label>Property title<sup>*</sup></label>
                <input id="courseName" placeholder="enter property title" {...register("courseName", { required: true })}
                    className="w-full"></input>
                {
                    errors.courseName && <p className="text-red-500">This field is required</p>
                }
            </div>


            <div>
                <label>Property short description <sup>*</sup></label>
                <textarea id="description" placeholder="enter property description" {...register("description", { required: true })} className="min-h-[140px] w-full" />
                {
                    errors.description && <p className="text-red-500">This field is required</p>
                }
            </div>

            <div>
                <label>Property Price<sup>*</sup></label>
                <input id="price" placeholder="enter property price" {...register("price", { required: true, valueAsNumber: true })}
                    className="w-full"></input>
                <HiOutlineCurrencyRupee className="absolute top-[50.5%] left-[26.5%] text-richblack-400" />
                {
                    errors.price && <p className="text-red-500">This field is required</p>
                }
            </div>

            <div>
                <label>Property category <sup>*</sup></label>
                <select id="category" defaultValue="" {...register("category", { required: true })}>
                    <option value="" disabled>Select a category</option>
                    {
                        !loading && courseCategories.map((category, index) => (
                            <option key={index} value={category?._id}>{category?.name}</option>
                        ))
                    }
                </select>
                {errors.category && <p className="text-red-500">This field is required</p>}
            </div>

            {/* Create custom tags for your property */}

            {/* CREate a component  for uploading images and previewing them */}

            {/* AMENETIES of the property  */}

            <div>
                {
                    editCourse && (
                        <button onClick={() => dispatch(setStep(2))} className="bg-richblack-700 text-white px-4 py-2 rounded-md">
                            Continue without saving
                        </button>
                    )
                }
                <IconBtn
                    text={!editCourse ? "Save and continue" : "Save changes"}
                />
            </div>





        </form>
    );
}
export default PropertyInfoForm;

//LOVE babbar code

// import { useEffect, useState } from "react"
// import { useForm } from "react-hook-form"
// import { toast } from "react-hot-toast"
// import { HiOutlineCurrencyRupee } from "react-icons/hi"
// import { MdNavigateNext } from "react-icons/md"
// import { useDispatch, useSelector } from "react-redux"

// import {
//   addCourseDetails,
//   editCourseDetails,
//   fetchCourseCategories,
// } from "../../../../../services/operations/courseDetailsAPI"
// import { setCourse, setStep } from "../../../../../slices/courseSlice"
// import { COURSE_STATUS } from "../../../../../utils/constants"
// import IconBtn from "../../../../Common/IconBtn"
// import Upload from "../Upload"
// import ChipInput from "./ChipInput"
// import RequirementsField from "./RequirementsField"

// export default function CourseInformationForm() {
//   const {
//     register,
//     handleSubmit,
//     setValue,
//     getValues,
//     formState: { errors },
//   } = useForm()

//   const dispatch = useDispatch()
//   const { token } = useSelector((state) => state.auth)
//   const { course, editCourse } = useSelector((state) => state.course)
//   const [loading, setLoading] = useState(false)
//   const [courseCategories, setCourseCategories] = useState([])

//   useEffect(() => {
//     const getCategories = async () => {
//       setLoading(true)
//       const categories = await fetchCourseCategories()
//       if (categories.length > 0) {
//         // console.log("categories", categories)
//         setCourseCategories(categories)
//       }
//       setLoading(false)
//     }
//     // if form is in edit mode
//     if (editCourse) {
//       // console.log("data populated", editCourse)
//       setValue("courseTitle", course.courseName)
//       setValue("courseShortDesc", course.courseDescription)
//       setValue("coursePrice", course.price)
//       setValue("courseTags", course.tag)
//       setValue("courseBenefits", course.whatYouWillLearn)
//       setValue("courseCategory", course.category)
//       setValue("courseRequirements", course.instructions)
//       setValue("courseImage", course.thumbnail)
//     }
//     getCategories()

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [])

//   const isFormUpdated = () => {
//     const currentValues = getValues()
//     // console.log("changes after editing form values:", currentValues)
//     if (
//       currentValues.courseTitle !== course.courseName ||
//       currentValues.courseShortDesc !== course.courseDescription ||
//       currentValues.coursePrice !== course.price ||
//       currentValues.courseTags.toString() !== course.tag.toString() ||
//       currentValues.courseBenefits !== course.whatYouWillLearn ||
//       currentValues.courseCategory._id !== course.category._id ||
//       currentValues.courseRequirements.toString() !==
//         course.instructions.toString() ||
//       currentValues.courseImage !== course.thumbnail
//     ) {
//       return true
//     }
//     return false
//   }

//   //   handle next button click
//   const onSubmit = async (data) => {
//     // console.log(data)

//     if (editCourse) {
//       // const currentValues = getValues()
//       // console.log("changes after editing form values:", currentValues)
//       // console.log("now course:", course)
//       // console.log("Has Form Changed:", isFormUpdated())
//       if (isFormUpdated()) {
//         const currentValues = getValues()
//         const formData = new FormData()
//         // console.log(data)
//         formData.append("courseId", course._id)
//         if (currentValues.courseTitle !== course.courseName) {
//           formData.append("courseName", data.courseTitle)
//         }
//         if (currentValues.courseShortDesc !== course.courseDescription) {
//           formData.append("courseDescription", data.courseShortDesc)
//         }
//         if (currentValues.coursePrice !== course.price) {
//           formData.append("price", data.coursePrice)
//         }
//         if (currentValues.courseTags.toString() !== course.tag.toString()) {
//           formData.append("tag", JSON.stringify(data.courseTags))
//         }
//         if (currentValues.courseBenefits !== course.whatYouWillLearn) {
//           formData.append("whatYouWillLearn", data.courseBenefits)
//         }
//         if (currentValues.courseCategory._id !== course.category._id) {
//           formData.append("category", data.courseCategory)
//         }
//         if (
//           currentValues.courseRequirements.toString() !==
//           course.instructions.toString()
//         ) {
//           formData.append(
//             "instructions",
//             JSON.stringify(data.courseRequirements)
//           )
//         }
//         if (currentValues.courseImage !== course.thumbnail) {
//           formData.append("thumbnailImage", data.courseImage)
//         }
//         // console.log("Edit Form data: ", formData)
//         setLoading(true)
//         const result = await editCourseDetails(formData, token)
//         setLoading(false)
//         if (result) {
//           dispatch(setStep(2))
//           dispatch(setCourse(result))
//         }
//       } else {
//         toast.error("No changes made to the form")
//       }
//       return
//     }

//     const formData = new FormData()
//     formData.append("courseName", data.courseTitle)
//     formData.append("courseDescription", data.courseShortDesc)
//     formData.append("price", data.coursePrice)
//     formData.append("tag", JSON.stringify(data.courseTags))
//     formData.append("whatYouWillLearn", data.courseBenefits)
//     formData.append("category", data.courseCategory)
//     formData.append("status", COURSE_STATUS.DRAFT)
//     formData.append("instructions", JSON.stringify(data.courseRequirements))
//     formData.append("thumbnailImage", data.courseImage)
//     setLoading(true)
//     const result = await addCourseDetails(formData, token)
//     if (result) {
//       dispatch(setStep(2))
//       dispatch(setCourse(result))
//     }
//     setLoading(false)
//   }

//   return (
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6"
//     >
//       {/* Course Title */}
//       <div className="flex flex-col space-y-2">
//         <label className="text-sm text-richblack-5" htmlFor="courseTitle">
//           Course Title <sup className="text-pink-200">*</sup>
//         </label>
//         <input
//           id="courseTitle"
//           placeholder="Enter Course Title"
//           {...register("courseTitle", { required: true })}
//           className="form-style w-full"
//         />
//         {errors.courseTitle && (
//           <span className="ml-2 text-xs tracking-wide text-pink-200">
//             Course title is required
//           </span>
//         )}
//       </div>
//       {/* Course Short Description */}
//       <div className="flex flex-col space-y-2">
//         <label className="text-sm text-richblack-5" htmlFor="courseShortDesc">
//           Course Short Description <sup className="text-pink-200">*</sup>
//         </label>
//         <textarea
//           id="courseShortDesc"
//           placeholder="Enter Description"
//           {...register("courseShortDesc", { required: true })}
//           className="form-style resize-x-none min-h-[130px] w-full"
//         />
//         {errors.courseShortDesc && (
//           <span className="ml-2 text-xs tracking-wide text-pink-200">
//             Course Description is required
//           </span>
//         )}
//       </div>
//       {/* Course Price */}
//       <div className="flex flex-col space-y-2">
//         <label className="text-sm text-richblack-5" htmlFor="coursePrice">
//           Course Price <sup className="text-pink-200">*</sup>
//         </label>
//         <div className="relative">
//           <input
//             id="coursePrice"
//             placeholder="Enter Course Price"
//             {...register("coursePrice", {
//               required: true,
//               valueAsNumber: true,
//               pattern: {
//                 value: /^(0|[1-9]\d*)(\.\d+)?$/,
//               },
//             })}
//             className="form-style w-full !pl-12"
//           />
//           <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-richblack-400" />
//         </div>
//         {errors.coursePrice && (
//           <span className="ml-2 text-xs tracking-wide text-pink-200">
//             Course Price is required
//           </span>
//         )}
//       </div>
//       {/* Course Category */}
//       <div className="flex flex-col space-y-2">
//         <label className="text-sm text-richblack-5" htmlFor="courseCategory">
//           Course Category <sup className="text-pink-200">*</sup>
//         </label>
//         <select
//           {...register("courseCategory", { required: true })}
//           defaultValue=""
//           id="courseCategory"
//           className="form-style w-full"
//         >
//           <option value="" disabled>
//             Choose a Category
//           </option>
//           {!loading &&
//             courseCategories?.map((category, indx) => (
//               <option key={indx} value={category?._id}>
//                 {category?.name}
//               </option>
//             ))}
//         </select>
//         {errors.courseCategory && (
//           <span className="ml-2 text-xs tracking-wide text-pink-200">
//             Course Category is required
//           </span>
//         )}
//       </div>
//       {/* Course Tags */}
//       <ChipInput
//         label="Tags"
//         name="courseTags"
//         placeholder="Enter Tags and press Enter"
//         register={register}
//         errors={errors}
//         setValue={setValue}
//         getValues={getValues}
//       />
//       {/* Course Thumbnail Image */}
//       <Upload
//         name="courseImage"
//         label="Course Thumbnail"
//         register={register}
//         setValue={setValue}
//         errors={errors}
//         editData={editCourse ? course?.thumbnail : null}
//       />
//       {/* Benefits of the course */}
//       <div className="flex flex-col space-y-2">
//         <label className="text-sm text-richblack-5" htmlFor="courseBenefits">
//           Benefits of the course <sup className="text-pink-200">*</sup>
//         </label>
//         <textarea
//           id="courseBenefits"
//           placeholder="Enter benefits of the course"
//           {...register("courseBenefits", { required: true })}
//           className="form-style resize-x-none min-h-[130px] w-full"
//         />
//         {errors.courseBenefits && (
//           <span className="ml-2 text-xs tracking-wide text-pink-200">
//             Benefits of the course is required
//           </span>
//         )}
//       </div>
//       {/* Requirements/Instructions */}
//       <RequirementsField
//         name="courseRequirements"
//         label="Requirements/Instructions"
//         register={register}
//         setValue={setValue}
//         errors={errors}
//         getValues={getValues}
//       />
//       {/* Next Button */}
//       <div className="flex justify-end gap-x-2">
//         {editCourse && (
//           <button
//             onClick={() => dispatch(setStep(2))}
//             disabled={loading}
//             className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
//           >
//             Continue Wihout Saving
//           </button>
//         )}
//         <IconBtn
//           disabled={loading}
//           text={!editCourse ? "Next" : "Save Changes"}
//         >
//           <MdNavigateNext />
//         </IconBtn>
//       </div>
//     </form>
//   )
// }
