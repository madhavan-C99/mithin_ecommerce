// AUTHAPI.JS

import axiosInstance from "./Axios";

/**
 * AUTH API LAYER
 * Only handles API communication.
 * No UI logic. No navigation. No storage.
 */

/**
 * Request OTP
 * @param {string} email
 */
export const requestOtp = async (email) => {
  return await axiosInstance.post("/adm/generate_otp", { email });
};

/**
 * Verify OTP
 * @param {string} email
 * @param {string} otp
 */
export const verifyOtp = async (otp, otp_id) => {
  return await axiosInstance.post("/adm/verify_otp", { otp, otp_id });
};

/**
 * Complete Profile (Signup for new users)
 * @param {object} data
 */
export const completeProfile = async (data) => {
  return await axiosInstance.post("/adm/create_customer", data);
};