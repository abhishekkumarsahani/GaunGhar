import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const eventApi = async (payload) => {
  const response = await axios.post(
    `${BASE_URL}/api/admin/event`,
    payload,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data;
};
