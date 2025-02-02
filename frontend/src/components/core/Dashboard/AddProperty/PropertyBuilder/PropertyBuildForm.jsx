import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import {  addPropertyView } from "../../../../../services/operations/propertyAPI";
import { setProperty, setStep } from "../../../../../slices/PropertySlice";
import IconBtn from "../../../../common/IconBtn";
import Upload from "../Upload";

export default function PropertyBuildForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { property, editProperty } = useSelector((state) => state.property);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editProperty) {
      setValue("propertyImages", property.Images || []);
      setValue("propertyVideos", property.Videos || []);
    }
  }, []);

  const onSubmit = async (data) => {
    console.log("Submitting form with data:", data); // Debugging log
    const formData = new FormData();

    data.propertyImages.forEach((image) => {
      formData.append("Images", image);
    });

    data.propertyVideos.forEach((video) => {
      formData.append("Videos", video);
    });

    setLoading(true);
    if (property?._id) {
      formData.append("propertyId", property._id);
    }

    const result = await addPropertyView(formData,token);

    if (result) {
      dispatch(setStep(3));
      dispatch(setProperty(result));
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 h-full"
    >
      {/* Upload Property Images */}
        <Upload
        name="propertyImages"
        label="Property Images"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editProperty && property?.Images ? property.Images : []}  // ✅ Fix: Ensure it's always an array
        />

        <Upload
        name="propertyVideos"
        label="Property Videos"
        register={register}
        setValue={setValue}
        errors={errors}
        video={true}
        editData={editProperty && property?.Videos ? property.Videos : []}  // ✅ Fix: Ensure it's always an array
        />


      {/* Submit Button */}
      <div className="flex justify-end gap-x-2">
        {editProperty && (
          <button
            onClick={() => dispatch(setStep(3))}
            disabled={loading}
            className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900"
          >
            Continue Without Saving
          </button>
        )}
        <IconBtn disabled={loading} text={!editProperty ? "Next" : "Save Changes"} />
      </div>
    </form>
  );
}

