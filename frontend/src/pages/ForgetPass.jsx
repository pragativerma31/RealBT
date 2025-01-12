import React, { use } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { getPasswordResetToken } from "../services/operations/authAPI"; 


const ForgetPass = () => {

    const [emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState("");
    const { loading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(getPasswordResetToken(email,setEmailSent)); 
    }
    return (
        <div className="text-white flex justify-center items-center">
            {
                loading ? (
                    <div>Loading...</div>
                ) : (
                    <div>
                        <h1>{
                            !emailSent ? "Reset your Password " : " Check your email for reset link"
                        }
                        </h1>
                        <p>
                            {
                                !emailSent ? "Don't worry! we will email you instructions to reset your password. If you dont have access to your email we can try account recovery" : " we have sent the reset email to ${email"
                            }
                        </p>

                        <form onSubmit={handleOnSubmit}>
                            {
                                !emailSent && (
                                    <label>
                                        <p>Email Address</p>
                                        <input required type="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email Address"></input>
                                    </label>
                                )
                            }
                            <button type="submit">
                                {
                                    !emailSent ? "Reset Password" : "Resend Email"
                                }
                            </button>

                        </form>

                        <div>
                            <Link to="/login"> Back to Login</Link>

                        </div>


                    </div>
                )
            }

        </div>
    )
};
export default ForgetPass;  