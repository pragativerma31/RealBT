import {toast} from "react-hot-toast"
import apiConnector from "../apiConnector"
import { propertyEndpoints } from "../apis"
import { categoriesEndpoints } from "../apis"

const {GET_CATEGORIES} = categoriesEndpoints
const {CREATE_PROPERTY_API,EDIT_PROPERTY_API,ADD_PROPERTY_VIEW_API,FETCH_BROKERS_PROPERTY_API , DELETE_PROPERTY_API} = propertyEndpoints

// fetching the available course categories
export const fetchPropertyCategories = async () => {
    let result = []
    try {
      const response = await apiConnector("GET", GET_CATEGORIES)
      console.log("COURSE_CATEGORIES_API API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Fetch Course Categories")
      }
      result = response?.data?.allcategory
    } 
    catch (error) {
      console.log("COURSE_CATEGORY_API API ERROR............", error)
      toast.error(error.message)
    }
    return result
}

//create property
export const addPropertyDetails = async (formdata, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
      console.log(formdata);
      const response = await apiConnector("POST", CREATE_PROPERTY_API, formdata, {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      })
      console.log("CREATE PROPERTY API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Add Property Details")
      }
      toast.success("Property Details Added Successfully")
      result = response?.data?.propertydetails
    } catch (error) {
      console.log("CREATE PROPERTY API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

export const addPropertyView = async (formdata, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("PUT", ADD_PROPERTY_VIEW_API , formdata, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    })
    console.log("CREATE PROPERTY API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Add Property Details")
    }
    toast.success("Property Media Added Successfully")
    result = response?.data?.property;
  } catch (error) {
    console.log("CREATE PROPERTY API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// edit the course details
export const editPropertyDetails = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("PUT", EDIT_PROPERTY_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    })
    console.log("EDIT PROPERTY API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Update Property Details")
    }
    toast.success("Property Details Updated Successfully")
    result = response?.data?.data
  } catch (error) {
    console.log("EDIT PROPERTY API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}
export const deleteProperty = async (propertyId, token) => {
  let result = null;
  const toastId = toast.loading("Deleting property...");

  try {
      const response = await apiConnector("DELETE", `${DELETE_PROPERTY_API}/${propertyId}`, null, {
          Authorization: `Bearer ${token}`,
      });

      console.log("DELETE PROPERTY API RESPONSE:", response);

      if (!response?.data?.success) {
          throw new Error(response?.data?.message || "Could not delete property");
      }

      result = response?.data;
      toast.success("Property deleted successfully");
  } catch (error) {
      console.error("DELETE PROPERTY API ERROR:", error);
      toast.error(error?.response?.data?.message || error.message || "Something went wrong");
  }

  toast.dismiss(toastId);
  return result;
};


export const fetchBrokersProperty = (token) => {
  return async (dispatch) => {
    const toastId = toast.loading("Fetching properties...");

    try {
      const response = await apiConnector("GET", FETCH_BROKERS_PROPERTY_API, null, {
        Authorization: `Bearer ${token}`,
      });

      console.log("FETCH BROKERS PROPERTY API RESPONSE:", response);

      if (!response?.data?.success) {
        throw new Error(response?.data?.message || "Could not fetch properties");
      }

      const result = response?.data?.properties;
      toast.success("Properties fetched successfully");
      return result;
    } catch (error) {
      console.error("FETCH BROKERS PROPERTY API ERROR:", error);
      toast.error(error?.response?.data?.message || error.message || "Something went wrong");
    } finally {
      toast.dismiss(toastId);
    }
  };
};




