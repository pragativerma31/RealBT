import React from "react";
import { sidebarLinks } from "../../../data/dashboard-links";
import { Logout } from "../../../services/operations/authAPI"
import SidebarLink from "./SidebarLink";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { VscSignOut } from "react-icons/vsc";
import ConfirmationModal from "../../common/ConfirmationModal"
import { useState } from "react";

const Sidebar = () => {

    const { user, loading: profileLoading } = useSelector((state) => state.profile);
    const { loading: authLoading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [confirmationModal, setConfirmationModal] = useState(null);

    if (profileLoading || authLoading) {
        return (
            <div>
                Loading...
            </div>
        )
    }


    return (
        <div>
            <div className="flex min-w-[222px] flex-col border-r-[1px] border-r-richblack-700 h-full bg-richblack-800 py-10">
                <div className="flex flex-col gap-5">
                    {
                        sidebarLinks.map((link, index) => {
                            if (link.type && user?.accountType !== link.type) return null;
                            return (
                                <SidebarLink key={link.id} link={link} iconName={link.icon} />
                            )
                        })}

                </div>
                {/* HORIZONTAL LINE */}
                <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700"></div>

                {/* SETTING AND LOGOUT */}
                <div className="flex flex-col ">
                    <SidebarLink link={{name:"Settings", path:"dashboard/settings"}} iconName="VscSettingsGear" />

                    <button onClick={()=>setConfirmationModal({
                        text1:"Are you sure you want to logout?",
                        text2:"You will be redirected to the login page",
                        btn1Text:"Logout",
                        btn2Text:"Cancel",
                        btn1Handler:()=>dispatch(Logout(navigate)),
                        btn2Handler:()=> setConfirmationModal(null),
                    })}
                    className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
                        <div className="flex items-center gap-x-2">
                            <VscSignOut className="text-lg" />
                            <span>Logout</span>
                        </div>
                    </button>
                </div>

            </div>
            {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
        </div>

    )
}
export default Sidebar;