
import React ,{ useState } from "react";
import { sidebarLinks } from "../../../data/dashboard-links";
import { Logout } from "../../../services/operations/authAPI"
import { useDispatch , useSelector} from "react-redux";
import { VscSignOut } from "react-icons/vsc";
import ConfirmationModal from "../../common/ConfirmationModal"
import { useNavigate, useLocation } from "react-router-dom";
import SidebarLink from "./SidebarLink";
import { matchPath } from "react-router-dom";

const Sidebar = () => {
    const { user, loading: profileLoading } = useSelector((state) => state.profile);
    const { loading: authLoading } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth)

    // Modal State
    const [confirmationModal, setConfirmationModal] = useState(null);

    // Show loading if profile or auth is still loading
    if (profileLoading || authLoading) {
        return <div>Loading...</div>;
    }

    // Handle Add Loan Offer Click
    const handleAddLoanOfferClick = () => {
        console.log("Add Loan Offers button clicked!"); // Debugging log
    
        const propertyMatch = matchPath("/loanOffers/property/:propertyID/add-loan-offer", location.pathname);
        const loanApplicationMatch = matchPath("/loanOffers/loanapplication/:loanApplicationID/add-loan-offer", location.pathname);
    
        if (!propertyMatch && !loanApplicationMatch ) {
            console.log("No valid ID found. Showing confirmation modal."); // Debugging log
            setConfirmationModal({
                text1: "To make an offer, you must choose a property or loan application.",
                text2: "Select one of the options below to proceed.",
                btn1Text: "Choose Property",
                btn2Text: "Choose Loan Application",
                btn1Handler: () => navigate("/properties"), 
                btn2Handler: () => navigate("/loanapplications"),
            });
        }
    };
    

    return (
        <div className="flex min-w-[222px] flex-col border-r-[1px] border-r-richblack-700 min-h-screen bg-richblack-800 py-10">
            <div className="flex flex-col gap-5">
                {sidebarLinks.map((link) => {
                    if (link.type && user?.role !== link.type) return null;

                    return (
                        <SidebarLink 
                            key={link.id} 
                            link={link} 
                            iconName={link.icon} 
                            onClick={link.name === "Add Loan Offers" ? handleAddLoanOfferClick : undefined} 
                        />
                    );
                })}
            </div>

            {/* HORIZONTAL LINE */}
            <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700"></div>

            {/* SETTINGS AND LOGOUT */}
            <div className="flex flex-col">
                <SidebarLink link={{name:"Settings", path:"dashboard/settings"}} iconName="VscSettingsGear" />

                <button onClick={() => setConfirmationModal({
                    text1: "Are you sure you want to logout?",
                    text2: "You will be redirected to the login page",
                    btn1Text: "Logout",
                    btn2Text: "Cancel",
                    btn1Handler: () => dispatch(Logout(token, navigate)),
                    btn2Handler: () => setConfirmationModal(null),
                })}
                className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
                    <div className="flex items-center gap-x-2">
                        <VscSignOut className="text-lg" />
                        <span>Logout</span>
                    </div>
                </button>
            </div>

            {/* Confirmation Modal */}
            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </div>
    );
};

export default Sidebar;
