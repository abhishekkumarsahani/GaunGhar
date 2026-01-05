import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const userApi = async (payload) => {
  const res = await axios.post(
    `${BASE_URL}/api/admin/user`,
    payload,
    { headers: { "Content-Type": "application/json" } }
  );
  return res.data;
};
