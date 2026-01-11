import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const clientNearMeApi = async (data) => {
  try {
    // Ensure NearID is a string if it exists in the payload
    const payload = {
      ...data,
      NearID: data.NearID ? String(data.NearID) : undefined
    };
    const response = await axios.post(`${BASE_URL}/api/near-me`, payload);
    return response.data;
  } catch (error) {
    console.error("NearMe API Error:", error);
    return { StatusCode: 500, NearMeLst: [] };
  }
};