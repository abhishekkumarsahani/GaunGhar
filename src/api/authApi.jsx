import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
// example: https://localhost:44353

// 🔹 Admin Login
export const adminLogin = async (loginData) => {
  const response = await axios.post(
    `${BASE_URL}/api/login`,
    loginData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

// 🔹 Change Password
export const changePassword = async (payload) => {
  const response = await axios.post(
    `${BASE_URL}/api/change-pwd`,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};
