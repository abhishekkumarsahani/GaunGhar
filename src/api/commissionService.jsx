import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getCommissionAnalytics = async (payload) => {
  const res = await axios.get(
    `${BASE_URL}/api/admin/commission-analytics`,
    {
      params: payload,   // <-- THIS is how GET sends data
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return res.data;
};
