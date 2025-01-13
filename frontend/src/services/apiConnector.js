// // src/services/apiConnector.js

// import axios from "axios";
// import { BASE_URL } from "./apis";

// // Create an axios instance with base configuration
// const apiConnector = axios.create({
//   baseURL: BASE_URL, // Base URL from apis.js
//   timeout: 10000,    // Optional: Set a timeout for API requests
//   headers: {
//     "Content-Type": "application/json", // Default header
//   },
// });

// // Add interceptors if needed (e.g., for auth tokens)
// apiConnector.interceptors.request.use(
//   (config) => {
//     // Add token if available
//     const token = localStorage.getItem("token"); // Example: token from localStorage
//     if (token) {
//       config.headers["Authorization"] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// apiConnector.interceptors.response.use(
//   (response) => response, // Handle successful responses
//   (error) => {
//     // Handle errors (e.g., unauthorized, server errors)
//     console.error("API Error:", error);
//     return Promise.reject(error);
//   }
// );

// export default apiConnector;

import axios from "axios";

const axiosInstance = axios.create({});

const apiConnector = (method, url, bodyData, headers, params) => {
  return axiosInstance({
    method: `${method}`,
    url: `${url}`,
    data: bodyData ? bodyData : null,
    headers: headers ? headers : null,
    params: params ? params : null,
  });
};

export { axiosInstance }; // Optional export if you still need axiosInstance elsewhere
export default apiConnector; // Export apiConnector directly

