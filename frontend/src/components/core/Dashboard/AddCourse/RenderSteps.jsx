import React from "react";
import { FaCheck } from "react-icons/fa";
import { useSelector } from "react-redux";
import PropertyInfoForm from "./PropertyInfoForm";
import PropertyBuildForm from "./PropertyBuildForm";
import PublishForm from "./PublishForm"; 

const RenderSteps = () => {
    const { step } = useSelector((state) => state.course)
    const steps = [
        {
            id: 1,
            title: "Property information",
        },
        {
            id: 2,
            title: "Property data",
        },
        {
            id: 3,
            title: "Publish",
        },
    ]
    return (
        <>
            <div>
                {steps.map((item) => {
                    <>
                        <div>
                            <div className={`${step === item.id
                                ? "bg-yellow-900 border-yellow-50 text-yellow-50"
                                : "border-richblack-700 bg-richblack-800 text-richblack-300"
                                }`}>
                                {
                                    step > item.id ? (<FaCheck />) : (item.id)
                                }

                            </div>
                        </div>

                    </>
                })}
            </div>
            <div>
                {steps.map((item) => {
                    <>
                        <div>
                            <p>{item.title}</p>
                        </div>
                    </>
                })}
            </div>

            {
                step === 1 && <PropertyInfoForm />
            }
            {step==2 && <PropertyBuildForm />}
            {step==3 && <PublishForm />}
        </>
    )
}

export default RenderSteps;