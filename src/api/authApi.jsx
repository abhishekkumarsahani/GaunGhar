import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL; 
// example: http://localhost:5000

export const adminLogin = async (loginData) => {
  const response = await axios.post(
    `${BASE_URL}/api/login`,
    loginData,
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
  return response.data;
};
