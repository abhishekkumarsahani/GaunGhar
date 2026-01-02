// api/sliderApi.js
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const sliderApi = async (payload) => {
  const res = await axios.post(`${BASE_URL}/api/admin/slider`, payload, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
};