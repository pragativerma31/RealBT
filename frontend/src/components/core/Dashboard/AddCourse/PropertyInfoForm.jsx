import React, { useEffect } from "react";
import { set } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import { useState } from "react";
import { HiOutlineCurrencyRupee } from "react-icons/hi";

const PropertyInfoForm = () => {
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
    } = useForm();
    const dispatch = useDispatch();
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
            setValue("courseName", course.courseName);
            setValue("courseTag", course.tag);
            setValue("description", course.description);
            setValue("price", course.price);
            setValue("category", course.category);
            setValue("thumbnail", course.thumbnail);
        }
        getCateories();
    },[])
    const onSubmit = async (data) => {

    }

    return (
        <form onSubmit={handleSubmit()}
            className="rounded-md border-richblack-700 bg-richblack-800 p-6 space-y-8">
                <div>
                    <label>Property title<sup>*</sup></label>
                    <input id="courseName" placeholder="enter property title" {...register("courseName",{required:true})}
                    className="w-full"></input>
                    {
                        errors.courseName && <p className="text-red-500">This field is required</p>
                    }
                </div>


                <div>
                    <label>Property short description <sup>*</sup></label>
                    <textarea id="description" placeholder="enter property description" {...register("description",{required:true})} className="min-h-[140px] w-full" />
                    {
                        errors.description && <p className="text-red-500">This field is required</p>
                    }
                </div>

                <div>
                    <label>Property Price<sup>*</sup></label>
                    <input id="price" placeholder="enter property price" {...register("price",{required:true,valueAsNumber:true})}
                    className="w-full"></input>
                    <HiOutlineCurrencyRupee className="absolute top-1/2 text-richblack-400" />
                    {
                        errors.price && <p className="text-red-500">This field is required</p>
                    }
                </div>

                <div>
                    <label>Property category <sup>*</sup></label>
                    <select id="category" defaultValue="" {...register("category",{required:true})}>
                        <option value="" disabled>Select a category</option>
                        {
                            !loading && courseCategories.map((category,index) => (
                                <option key={index} value={category?._id}>{category?.name}</option>
                            ))
                        }
                    </select>
                    {errors.category && <p className="text-red-500">This field is required</p>}
                </div>

                {/* Create custom tags for your property */}

                {/* CREate a coponent for uploading images and previewing them */}

            



        </form>
    );
}
export default PropertyInfoForm;