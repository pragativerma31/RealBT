// src/services/apis.js

const BASE_URL = "http://localhost:4000/api/v1"; // Replace with your backend URL

export const API_ENDPOINTS = {
  GET_CATEGORIES: BASE_URL + "/categories/getAllCategories",     // Example GET endpoint
  CREATE_USER: "/api/user",  // Example POST endpoint
  LOGIN: "/api/auth/login",  // Example login endpoint
};

export const endpoints = {
  SENDOTP_API: BASE_URL + "/auth/sendotp",
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
  RESETPASSTOKEN_API: BASE_URL + "/password/reset-password-token",
  RESETPASSWORD_API: BASE_URL + "/password/reset-password",
}

