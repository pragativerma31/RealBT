import React, { use } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../../common/IconBtn";


const MyProfile = () => {
    const {user} = useSelector((state) => state.profile);
    const navigate = useNavigate();
    return (
        <div>
            <h1>
                MY PROFILE
            </h1>

            {/* SECTION 1 */}
            <div>
                <div>
                    <img src={user?.imageURL} alt={`profile-${user?.firstName}`} className="aspect-square w-[78px] rounded-full object-cover"/>
                    <div>
                        <p>{user?.firstName + " " + user?.lastName}</p>
                        <p>{user?.email}</p>
                    </div>
                </div>
                <IconBtn 
                    text="Edit"
                    onClick={()=>{
                        navigate("/dashboard/settings")
                    }} />
            </div>


        </div>
    )
}
export default MyProfile;