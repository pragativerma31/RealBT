import React from "react";
import * as Icons from "react-icons/vsc";
import { matchPath, useLocation } from "react-router-dom";
// import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

const SidebarLink = ({ link, iconName, onClick }) => {
    const Icon = Icons[iconName];
    const location = useLocation();

    const matchRoute = (link) => {
        if (link.name === "Add Loan Offers") {
            return (
                
                matchPath(link.path1, location.pathname) ||
                matchPath(link.path2, location.pathname) 
            );
        }
        return matchPath(link.path, location.pathname);
    };

    return (
        <NavLink 
            to={link.path} 
            className={`${matchRoute(link) ? "bg-yellow-800 text-white" : "text-white hover:bg-gray-700 hover:text-yellow-50"} flex relative items-center px-3 py-2 text-sm font-medium rounded-md`}
            onClick={(e) => {
                if (onClick) {
                    e.preventDefault(); // Prevent automatic navigation
                    onClick();
                }
            }}
        >
            <span className={`absolute left-0 top-0 h-full w-[0.2rem] bg-yellow-50 ${matchRoute(link) ? "opacity-100" : "opacity-0"}`}></span>
            <div className="flex items-center gap-x-2"> 
                <Icon className="text-lg" />
                <span>{link.name}</span>
            </div>
        </NavLink>
    );
};

export default SidebarLink;