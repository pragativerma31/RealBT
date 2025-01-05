import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { matchPath } from "react-router";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProfileDropDown from "../core/Auth/ProfileDropDown";


const Navbar = () => {   

    const{token} = useSelector(state=>state.auth);
    const {user} = useSelector(state=>state.profile);
    const {totalItems} = useSelector(state=>state.cart);

    const location = useLocation(); 
    const matchRoute=(route)=>{
        return matchPath({path:route},location.pathname)
    }
    return (
        <div className="flex h-12 items-center justify-center border-b-[1px] border-b-richblack-700">
            <div className="flex w-11/12 max-w-maxContent items-center justify-between">

            <Link to="/">
                <img src={Logo} alt="logo" width={160} height={42}  />
        
            </Link>   

            {/* Nav Links */}
            <nav>
                <ul className="flex gap-x-6 text-richblack-25">
                    {
                        NavbarLinks.map((link,index)=>{
                            return(
                                <li key={index} className="cursor-pointer hover:text-richblack-50 transition-all duration-200">
                                    {
                                        link.title === "Catalog" ? (<div></div>) : (<Link to={link?.path}> <p className={`${matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"}`}>{link.title}</p>
                                        </Link>)
                                    }
                                </li>
                            )
                        })
                    }
                </ul>
            </nav>

            {/* Login/SIGNUP/DASHBOARD */}
            <div className="flex gap-x-4 items-center"> 
                {
                    user && user?.accountType != "Instructor" && (
                        <Link to ="/dashboard/cart" className="relative">
                            <AiOutlineShoppingCart />
                            {
                                totalItems > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-yellow-25 text-richblack-900 rounded-full px-1">{totalItems}</span>
                                )
                            }
                        </Link>
                    )
                }
                {
                    token === null &&(
                        <Link to="/login">
                        <button className="border border-richblack-700 bg-richblack-800 text-richblack-100 px-4 py-1 rounded-full">
                            Log in
                        </button>
                        </Link>
                    )
                }
                {
                    token === null && (
                        <Link to ="/signup">    
                        <button className="border border-richblack-700 bg-richblack-800 text-richblack-100 px-4 py-1 rounded-full">
                            Sign up
                        </button>
                        </Link>
                    )
                }
                {
                    token !== null && <ProfileDropDown />
                }

            </div>


            </div>

        </div>
    )
}   
export default Navbar;  