import { toast } from "react-hot-toast"
import {jwtDecode} from "jwt-decode";
import { setLoading, setToken } from "../../slices/authSlice"
import { setUser } from "../../slices/profileSlice"
import  apiConnector  from "../apiConnector"
import { endpoints } from "../apis"



const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
  LOGOUT_API,
} = endpoints

export function sendOtp(email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email , 
        checkUserPresent: true,
      });
      console.log("SENDOTP API RESPONSE............", response);

      if (!response.data.success) {
        // If backend sends success: false, throw an error with its message
        throw new Error(response.data.message);
      }

      toast.success("OTP Sent Successfully");
      navigate("/verify-email");
    } catch (error) {
      console.error("SENDOTP API ERROR............", error);

      // Handle Axios-specific errors
      if (error.isAxiosError) {
        if (error.code === "ECONNABORTED") {
          toast.error("Request timed out. Please try again.");
        } else if (error.response) {
          // Errors with a response from the server
          const errorMessage =
            error.response.data?.message || "An error occurred. Please try again.";
          toast.error(errorMessage);
        } else if (error.request) {
          // No response received from the server
          toast.error("No response from the server. Please check your connection.");
        } else {
          // Axios-specific errors without a server response
          toast.error("An unexpected error occurred. Please try again.");
        }
      } else {
        // Non-Axios errors (unexpected issues)
        toast.error(error.message || "Something went wrong.");
      }
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}



export function signUp(
  role,
  firstName,
  lastName,
  email,
  password,
  otp,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        role,
        firstName,
        lastName,
        email,
        password,
        otp,
      })

      console.log("SIGNUP API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Signup Successful")
      navigate("/login")
    } catch (error) {
      console.log("SIGNUP API ERROR............", error)
      toast.error("Signup Failed")
      navigate("/signup")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", LOGIN_API, { email, password });

      console.log("LOGIN API RESPONSE:", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      const { token, existingUser } = response.data;

      // Decode the token to get the expiration time
      const { exp } = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
      const timeUntilExpiration = (exp - currentTime - 2) * 1000; // Remaining time minus 2 seconds, in milliseconds

      if (timeUntilExpiration <= 0) {
        throw new Error("Token is already expired");
      }

      // Set a timeout to remove the token 2 seconds before it expires
      setTimeout(() => {
        dispatch(Logout(token,navigate));
      }, timeUntilExpiration);

      // Save token and user data to localStorage
      toast.success("Login Successful");
      dispatch(setToken(token));
      dispatch(setUser(existingUser));

      localStorage.setItem("token", JSON.stringify(token));
      localStorage.setItem("user", JSON.stringify(existingUser));

      // Navigate to the dashboard
      navigate("/dashboard/my-profile");
    } catch (error) {
      console.error("LOGIN ERROR:", error);
      toast.error(error.message || "Login Failed");
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}



export function getPasswordResetToken(email, setEmailSent) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", RESETPASSTOKEN_API, {
        email,
      })

      console.log("RESETPASSTOKEN RESPONSE............", response)

      if (response.data.success) {
        toast.success("Reset Email Sent");
        setEmailSent(true); // This updates the state correctly
      } 
      else {
        throw new Error(response.data?.message || "Unexpected Error");
      }
    } 
    catch (error) {
      console.log("RESETPASSTOKEN ERROR............", error);
      toast.error("Failed To Send Reset Email");
    } 
    finally {
      toast.dismiss(toastId);
      dispatch(setLoading(false));
    }
  }
}

export function resetPassword(password, confirmPassword, resetToken, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", RESETPASSWORD_API, {
        password,
        confirmPassword,
        resetToken,
      })

      console.log("RESETPASSWORD RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Password Reset Successfully")
      navigate("/login")
    } catch (error) {
      console.log("RESETPASSWORD ERROR............", error)
      toast.error("Failed To Reset Password")
    }
    toast.dismiss(toastId)
    dispatch(setLoading(false))
  }
}




export const AfterDeleteUser = (navigate) => {
  return async (dispatch) => {
    try {
      // Update Redux store
      dispatch(setToken(null));
      dispatch(setUser(null));

      // Clear the token and user data from localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      
      // Redirect to signup  page
      navigate("/signup");
    } catch (error) {
      console.error("Error:", error);
    }
  };
};

export function Logout(token, navigate) {
  return async (dispatch) => {
    try {
      // Notify the backend to invalidate the token
      const response = await apiConnector("POST", LOGOUT_API, null, {
        Authorization: `Bearer ${token}`,
        withCredentials: true,
      });

      if (response.data.success) {
        // Update Redux store
        dispatch(setToken(null));
        dispatch(setUser(null));

        // Clear the token and user data from localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        // Show a toast notification
        toast.success("Logged out successfully");

        // Redirect to login page
        navigate("/login");
      } else {
        console.error("Logout failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error("Logout failed. Please try again.");
    }
  };
}

//export const Logout = (navigate) => {
  //   return async (dispatch) => {
  //     try {
  //       // Update Redux store
  //       dispatch(setToken(null));
  //       dispatch(setUser(null));
  
  //       // Clear the token and user data from localStorage
  //       localStorage.removeItem("token");
  //       localStorage.removeItem("user");
  
  //       // Show a toast notification
  //       toast.success("Logged out successfully");
  
  //       // Redirect to login page
  //       navigate("/login");
  //     } catch (error) {
  //       console.error("Error during logout:", error);
  //     }
  //   };
  // };


