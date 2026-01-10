import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const clientToleApi = async (payload) => {
  const res = await axios.post(`${BASE_URL}/api/tole`, payload, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
};
