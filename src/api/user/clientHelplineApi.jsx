import axios from "axios"; 

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const clientHelplineApi = async (data) => {
  try {
    // Corrected the variable name to 'data' and fixed the axios syntax
    const response = await axios.post(`${BASE_URL}/api/helpline`, data);
    return response.data;
  } catch (error) {
    console.error("Helpline API Error:", error);
    return { StatusCode: 500, Message: "Server Error", CHLst: [] };
  }
};