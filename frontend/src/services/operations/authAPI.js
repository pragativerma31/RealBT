import { toast } from "react-hot-toast"

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
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      })

      console.log("LOGIN API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Login Successful")
      dispatch(setToken(response.data.token))
      localStorage.setItem("token", JSON.stringify(response.data.token))
      localStorage.setItem("user", JSON.stringify(response.data.user))
      navigate("/dashboard/my-profile")
    } catch (error) {
      console.log("LOGIN API ERROR............", error)
      toast.error("Login Failed")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
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

export function resetPassword(password, confirmPassword, token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", RESETPASSWORD_API, {
        password,
        confirmPassword,
        token,
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

// export const handleLogout = async (dispatch, navigate) => {
//   try {
//       // Notify the backend to invalidate the token
//       const token = localStorage.getItem('token');
//       console.log(token);
//       const response = await apiConnector("POST", endpoints.LOGOUT_API, {}, {
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//         withCredentials: true, // If using cookies, also ensure this is true
//       });


//       if (response.data.success) {
//           // Update Redux store
//           dispatch(setToken(null));
//           dispatch(setUser(null));

//           // Clear the token and user data from localStorage
//           localStorage.removeItem('token');
//           localStorage.removeItem('user');

//           // Show a toast notification
//           toast.success('Logged out successfully');

//           // Redirect to login page
//           navigate('/login');
//       } else {
//           console.error('Logout failed:', response.data.message);
//       }
//   } catch (error) {
//       console.error('Error during logout:', error);
//   }
// };

export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null))
    dispatch(setUser(null))
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast.success("Logged Out")
    navigate("/")
  }
}
