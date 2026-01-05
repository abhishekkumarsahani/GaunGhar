import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const complainApi = async (payload) => {
  const res = await axios.post(
    `${BASE_URL}/api/admin/complain`,
    payload,
    { headers: { "Content-Type": "application/json" } }
  );
  return res.data;
};
