import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const clientEventApi = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/event`, data);
    return response.data;
  } catch (error) {
    console.error("Event API Error:", error);
    return { StatusCode: 500, Message: "Server Error", EventInfoLst: [] };
  }
};