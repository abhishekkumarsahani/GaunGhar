import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
export const incExpApi = async (payload) => {
  const response = await axios.post(
    `${BASE_URL}/api/admin/inc-exp`,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};
