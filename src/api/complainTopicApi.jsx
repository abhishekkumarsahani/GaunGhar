import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const complainTopicApi = async (payload) => {
  const response = await axios.post(
    `${BASE_URL}/api/admin/complain-topic`,
    payload,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data;
};
