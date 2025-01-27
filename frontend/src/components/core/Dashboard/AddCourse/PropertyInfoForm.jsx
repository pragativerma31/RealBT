
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
    const { course, editCourse } = useSelector((state) => state.course);
    const [loading, setLoading] = useState(false);
    const [courseCategories, setCourseCategories] = useState([]);

    useEffect(() => {
        const getCateories = async () => {
            setLoading(true);
            const categories = await fetchCourseCategories();
            if (categories.length > 0) {
                setCourseCategories(categories);
            }
            setLoading(false);
        }
        if (editCourse) {
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