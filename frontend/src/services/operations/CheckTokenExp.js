import React, { createContext, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode}from "jwt-decode";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { setToken} from "../../slices/authSlice";
import { setUser } from "../../slices/profileSlice"; // Update according to your Redux action file

const AuthContext = createContext();

export const TokenExp = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleExpiredToken = () => {
    // Clear local storage and Redux state for token and user
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(setToken(null));
    dispatch(setUser(null));
    toast.error("Session expired. Please log in again.");
    navigate("/login"); // Redirect to login page
  };

  const checkTokenExpiration = () => {
    const token = JSON.parse(localStorage.getItem("token"));

    if (token) {
      try {
        const { exp } = jwtDecode(token); // Decode the token to get the expiration time
        const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

        if (exp <= currentTime) {
          // Token has already expired
          handleExpiredToken();
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        handleExpiredToken(); // Handle invalid tokens as well
      }
    }
  };

  useEffect(() => {
    checkTokenExpiration(); // Initial check on mount
    const interval = setInterval(checkTokenExpiration, 59 * 1000); // Check every 58 seconds
    return () => clearInterval(interval); // Clean up interval on component unmount
  }, [dispatch, navigate]);

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);


