// src/services/apis.js

const BASE_URL = "http://localhost:4000/api/v1"; // Replace with your backend URL

export const API_ENDPOINTS = {
  GET_CATEGORIES: BASE_URL + "/categories/getAllCategories",     // Example GET endpoint
};

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
