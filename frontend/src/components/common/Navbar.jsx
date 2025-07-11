
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { BsChevronDown } from "react-icons/bs";
import Logo from "../../assets/Logo/RealBTLogo.png";
import { NavbarLinks } from "../../data/navbar-links";
import { matchPath, Navigate, useNavigate } from "react-router";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import apiConnector from "../../services/apiConnector";
import { categoriesEndpoints } from "../../services/apis";
import { VscBell} from "react-icons/vsc";


const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  // Fetch sublinks for the catalog
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await apiConnector("GET", categoriesEndpoints.GET_CATEGORIES);
        console.log("API Response:", res.data);
        setSubLinks(res.data.allcategory);
      } catch (error) {
        console.log("Could not fetch Categories.", error);
      }
      setLoading(false);
    })();
  }, []);

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };
  return (
    <div className="flex h-12 items-center justify-center border-b-[1px] border-b-richblack-700 bg-richblack-800">
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img src={Logo} alt="logo" width={160} height={42} />
        </Link>
        {/* Navigation Links */}
        <nav>
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li
                key={index}
                className="cursor-pointer hover:text-richblack-100 transition-all duration-200"
              >
                {link.title === "Properties" ? (
                    <div
                      className={`group relative flex cursor-pointer items-center gap-1 ${
                        matchRoute("/catalog/:catalogName")
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      <span className="flex items-center gap-x-1" onClick={() => navigate("/properties")}>
                        Properties <BsChevronDown />
                      </span>
                      <div
                        className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblue-500 p-4 text-richblack-100 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[200px]"
                      >
                        <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblue-500"></div>
                        {loading ? (
                          <p className="text-center text-richblack-100">Loading...</p>
                        ) : Array.isArray(subLinks) && subLinks.length > 0 ? (
                          <>
                            {subLinks?.map((category, i) => (
                              <Link
                                to={`/properties/${category.name
                                  .split(" ")
                                  .join("-")
                                  .toLowerCase()}`}

                                className="rounded-lg bg-transparent py-4 pl-4 text-richblack-100 hover:bg-richblue-600 hover:text-yellow-25 transition-all"
                                key={category._id} // Use category._id as the unique key
                              >
                                <p>{category.name}</p>
                              </Link>
                            ))}
                          </>
                        ) : (
                          <p className="text-center text-richblack-100">No Properties Found</p>
                        )}
                      </div>
                    </div>
                  ) : (
                  <Link to={link?.path}>
                    <p
                      className={`${matchRoute(link?.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                        }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Authentication Buttons or Dashboard/Profile */}
        <div className="flex gap-x-4 items-center">
          {!token ? (
            <>
              <Link to="/login">
                <button className="border-b-[2px]  border-yellow-500 bg-yellow-50 text-richblack-900 px-4 py-1 rounded-[4px]">
                  Log in
                </button>
              </Link>
              <Link to="/signup">
                <button className="border-b-[2px]  border-yellow-500 bg-yellow-50 text-richblack-900 px-4 py-1 rounded-[4px]">
                  Sign up
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/dashboard/notifications">
                <button className="border-b-[2px] border-yellow-500 bg-yellow-50 text-richblack-100 px-4 py-1 rounded-[4px]">
                  <VscBell  className="text-xl text-richblack-900"></VscBell>
                </button>
              </Link>
              <ProfileDropDown />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;


