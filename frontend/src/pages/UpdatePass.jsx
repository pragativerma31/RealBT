import React,{useState} from "react";
import { useSelector,useDispatch } from "react-redux";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link,useLocation} from "react-router-dom";
import { resetPassword } from "../services/operations/authAPI";

const UpdatePass = () => {  
    const dispatch = useDispatch();
    const location = useLocation();
    
    const [formData , setFormData]=useState({password:'',confirmPassword:''});
    const [showPassword , setShowPassword]=useState(false); 
    const [showConfirmPassword , setShowConfirmPassword]=useState(false); 
    const {loading}=useSelector((state)=>state.auth);

    const {password,confirmPassword}=formData;

    const handleOnChange=(e)=>{
        setFormData ((prevData=>(
            {
                ...prevData,
                [e.target.name]:e.target.value
            }
        )))
    }

    const handleOnSubmit=(e)=>{
        e.preventDefault();
        const token=location.pathname.split("/").at(-1);
        dispatch(resetPassword(password,confirmPassword,token));
        console.log(formData);
    }
    return (
        <div>
            {
                loading ? (
                    <div>Loading...</div>
                ): (
                    <div>
                        <h1>Choose new Password</h1>
                        <p>Almost done! Enter your new Password and you're all set..</p>
                        <form onSubmit={handleOnSubmit}>

                            <label>
                                <p>New Password-</p>
                                <input required type={showPassword ? "text" : "password"} name="password" value={password} onChange={handleOnChange} placeholder="Password"/>

                                <span onClick={()=>setShowPassword((prev)=>!prev)}>
                                    {
                                        showPassword ? <AiFillEyeInvisible fontSize={24} /> : <AiFillEye fontSize={24}/>
                                    }

                                </span>
                            </label>


                            <label>
                                <p>Confirm New Password-</p>
                                <input required type={showConfirmPassword ? "text" : "password"} name="confirmpassword" value={confirmPassword} onChange={handleOnChange} placeholder="Confirm password"/>

                                <span onClick={()=>setShowConfirmPassword((prev)=>!prev)}>
                                    {
                                        showConfirmPassword ? <AiFillEyeInvisible fontSize={24} /> : <AiFillEye fontSize={24}/>
                                    }

                                </span>
                            </label>

                            <button type="submit">
                                Reset Password
                            </button>
                        </form>
                        <div>
                            <Link to="/login">
                                Back to Login
                            </Link>
                        </div>



                    </div>
                )
            }
        </div>
    );
}
export default UpdatePass;