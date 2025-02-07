
const BASE_URL = "http://localhost:4000/api/v1"; // Replace with your backend URL

export const endpoints = {
  SENDOTP_API: BASE_URL + "/auth/sendotp",
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
  RESETPASSTOKEN_API: BASE_URL + "/password/reset-password-token",
  RESETPASSWORD_API: BASE_URL + "/password/reset-password",
  LOGOUT_API: BASE_URL + "/auth/logout",


  GET_USER_MY_PROPERTIES_API : BASE_URL + "/profile/getMyProperties",
}

// SETTINGS PAGE API
export const settingsEndpoints = {
  UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateprofileImg",
  UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
  CHANGE_PASSWORD_API: BASE_URL + "/auth/changePassword",
  DELETE_PROFILE_API: BASE_URL + "/profile/deleteProfile",
}

export const profileEndpoints = {
  GET_USER_DETAILS_API: BASE_URL + "/profile/user-details",
  GET_USER_ENROLLED_COURSES_API: BASE_URL + "/profile/enrolled-courses",
}

export const categoriesEndpoints = {
  GET_CATEGORIES: BASE_URL + "/categories/getAllCategories",     
};

export const loanTypesEndpoints = {
  GET_LOAN_TYPES_API: BASE_URL + "/loanTypes/getAllLoanTypes",     
};

export const propertyEndpoints = {
  CREATE_PROPERTY_API : BASE_URL + "/properties/createProperty",
  EDIT_PROPERTY_API: BASE_URL + "/properties/editProperty",
  ADD_PROPERTY_VIEW_API: BASE_URL + "/properties/addPropertyView",
  FETCH_BROKERS_PROPERTY_API: BASE_URL +"/properties/fetch-properties",
  DELETE_PROPERTY_API : BASE_URL + "/properties/delete-property/:propertyId"
}

export const loanApplicationEndpoints = {
  CREATE_LOAN_APPLICATION_API : BASE_URL + "/loanApplications/createLoanApplication",
  EDIT_LOAN_APPLICATION_API: BASE_URL + "/loanApplications/editLoanApplication",
  DELETE_LOAN_APPLICATION_API: BASE_URL + "/loanApplications/deleteLoanApplication",
  FETCH_CUSTOMER_APPLICATION_API:BASE_URL+"/loanApplications/getAllApplications"
}
