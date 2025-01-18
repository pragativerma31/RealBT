import React from "react";
import * as Icons from "react-icons/vsc";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

const SidebarLink = ({link,iconName}) => {

    const Icon=Icons[iconName];
    const location = useLocation();
    const dispatch = useDispatch();

    const matchRoute = (route) => {
        return matchRoute({path:route},location.pathname);
    }



    return(
        <NavLink to={link.path} className={`${matchRoute(link.path) ? "bg-yellow-800 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"} flex relative items-center px-3 py-2 text-sm font-medium rounded-md`}>
            <span className={`absolute left-0 top-0 h-full w-[0.2rem] bg-yellow-50 ${matchRoute(link.path) ? "opacity-100" : "opacity-0" } `}> </span>

            <div className="flex items-center gap-x-2"> 
                <Icon className="text-lg" />
                <span>{link.title}</span>
            </div>

        </NavLink>
    )
}
export default SidebarLink;