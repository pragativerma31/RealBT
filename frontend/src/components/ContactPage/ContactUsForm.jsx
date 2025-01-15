import React from "react";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import CountryCode from "../../data/countrycode.json"


const ContactUsForm = () => {
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful }
    } = useForm();

    const submitContactForm = async (data) => {
        console.log("logging data", data);
        try{
            setLoading(true);
            // const response = await apiConnector("POST" , contactusEndpoint.CONTACT_US_API , data);
            const response = {status:"OK"}
            console.log("logging response", response);
            setLoading(false);
        }
        catch(error){
            console.log("error", error.message);
            setLoading(false);
        }

    }

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                email: "",
                firstname: "",
                lastname: "",
                message: "",
                phoneNo: "",

            });
        }
    }, [reset, isSubmitSuccessful]);


    return (
        <form onSubmit={handleSubmit(submitContactForm)}>
            <div className="flex flex-col gap-14">
            <div className="flex gap-5">
                {/* FIRST NAME */}
                <div className="flex flex-col">
                    <label htmlFor="firstname">First Name</label>
                    <input type="text" name="firstname" id="firstname" placeholder="Enter First Name" className="text-black"
                        {...register("firstname", { required: true })}
                    />
                    {
                        errors.firstname && (
                            <span>First Name is required</span>
                        )
                    }
                </div>

                {/* LAST NAME */}
                <div className="flex flex-col">
                    <label htmlFor="lastname">First Name</label>
                    <input type="text" name="lastname" id="lastname" placeholder="Enter Last Name" className="text-black"
                        {...register("lastname", { required: true })}
                    />
                    {
                        errors.lastname && (
                            <span>Last Name is required</span>
                        )
                    }
                </div>
            </div>

            {/* EMAIL */}
            <div className="flex flex-col">
                <label htmlFor="email">Email Address</label>
                <input type="email" name="email" id="email" placeholder="Enter Email Address" className="text-black"
                    {...register("email", { required: true })}
                />
                {
                    errors.email && (
                        <span>Email is required</span>
                    )
                }

            </div>

            {/* PHONE NUMBER */}
            <div className="flex flex-col ">
                <label htmlFor="phoneno">Phone Number</label>
                <div className="flex flex-row gap-1">
                    {/* DROPDOWN */}
                    <div className="flex flex-col gap-2 w-[80px]">
                        <select name="dropdown" id="dropdown" className="text-black bg-yellow-50" {...register("countrycode", { required: true })}>
                            {
                                CountryCode.map((element, index) => {
                                    return (
                                        <option key={index} value={element.code}>{element.code}--{element.country}</option>
                                    )
                                })
                                
                            }
                        </select>

                    </div>


                    <div className="flex w-[calc(100%-90px)] flex-col gap-2">
                        <input type="number" name="phoneno" id="phoneno" placeholder="XXXXXXXXXX" className="text-black" {...register("phoneNo" , {required:true,maxLength:{value:10,message:"Invalid"} , minLength:{value:8,message:"Invalid"}})} />
                    </div>
                </div>
                {errors.phoneNo && (
                    <span>{errors.phoneNo.message}</span>
                )}

            </div>

            {/* message */}
            <div className="flex flex-col">
                <label htmlFor="message">Message</label>
                <textarea name="message" id="message" cols="30" rows="7" placeholder="Enter Message" className="text-black"
                    {...register("message", { required: true })}
                />
                {
                    errors.message && (
                        <span>Please enter your message</span>
                    )
                }

            </div>

            
            <button type="submit" className="rounded-md bg-yellow-50 text-center px-6 text-[16px] font-bold text-black"> Send Message</button>
            </div>
        </form>

    )
}
export default ContactUsForm;