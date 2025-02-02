import {toast} from "react-hot-toast"
import apiConnector from "../apiConnector"
import { propertyEndpoints } from "../apis"
import { categoriesEndpoints } from "../apis"

const {GET_CATEGORIES} = categoriesEndpoints
const {CREATE_PROPERTY_API,EDIT_PROPERTY_API,ADD_PROPERTY_VIEW_API} = propertyEndpoints

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

