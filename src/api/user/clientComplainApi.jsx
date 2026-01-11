import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const clientComplainApi = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/complain`, data);
    return response.data;
  } catch (error) {
    console.error("Complain API Error:", error);
    return { StatusCode: 500, Message: "Error", TopicLst: [], ComplainLst: [] };
  }
};