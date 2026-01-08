import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const userLoginApi = async (payload) => {
  const response = await axios.post(
    `${BASE_URL}/api/login`,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};
