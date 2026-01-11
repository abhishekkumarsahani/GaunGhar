import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const clientUserApi = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/user-info`, data);
    return response.data;
  } catch (error) {
    console.error("User Info API Error:", error);
    return { StatusCode: 500, Message: "Error", userLst: [] };
  }
};