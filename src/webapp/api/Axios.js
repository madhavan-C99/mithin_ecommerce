import axios from "axios";

/**
 * Central Axios Instance
 * Single source of truth for API communication
 */

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Request Interceptor
 * Attach JWT automatically if available
 */
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Response Interceptor
 * 1. Return only response.data
 * 2. Normalize errors
 * 3. Handle 401 globally
 */
axiosInstance.interceptors.response.use(
  (response) => {
    // If backend wraps inside data, unwrap it here
    return response.data?.data ?? response.data;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("access_token");
        localStorage.removeItem("user");   
    }

    const normalizedError = {
      message:
        error.response?.data?.data?.message ||
        error.response?.data?.message ||
        error.message ||
        "Something went wrong",
      status: error.response?.status || null,
      data: error.response?.data || null,
    };

    return Promise.reject(normalizedError);
  }
);

export default axiosInstance;